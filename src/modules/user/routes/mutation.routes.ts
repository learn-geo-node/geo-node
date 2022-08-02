import { Conflict, InternalServerError, NotFoundError } from "@/errors";
import { UserService } from "../user.service";
import { UserRouterProps } from "../interface";
import { DUPLICATE_KEY_VALUE_ERROR } from "@/constants";

export const mutationRouter: UserRouterProps = {
  service: UserService.getInstance(),
  routes: [
    {
      name: 'createUser',
      method: "post",
      path: '',
      controller: async (req, res) => {
        try {
          await mutationRouter.service.addUser(req.body);
          return res.status(201).send("User created successfully.") 
        } catch (error) {
          if (error.code === DUPLICATE_KEY_VALUE_ERROR) {
            return res.send(new Conflict("Account already exists."));
          } 
          return res.send(new InternalServerError(error));
        }
      },
    },
    {
      name: "deleteUser",
      method: "delete",
      path: '/:id',
      controller: async (req, res) => {
      try {
        const { id } = req.params;
        const user = await mutationRouter.service.deleteUserById(id);
        if (!user) {
          return res.status(404).send(new NotFoundError(`User not found`));
        }
        return res.status(200).send({ message: "User deleted successfully." });
      } catch (error) {
        return res.send(new InternalServerError(error));
      }
      },
    }
  ]
}