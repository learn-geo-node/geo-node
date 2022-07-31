import { Conflict, InternalServerError, NotFoundError } from "@/errors";
import { UserService } from "./user.service";
import { UserRouterProps } from "./interface";
import { DUPLICATE_KEY_VALUE_ERROR } from "@/constants";

const router: UserRouterProps = {
  service: UserService.getInstance(),
  routes: [
    {
      name: 'getAllUsers',  
      method: "get",
      path: '',
      controller: async (_, res) => {
        try {
          const user = await router.service.findAllUsers();
          return res.status(200).send(user); 
        } catch (error) {
          return res.send(new InternalServerError(error));
        }
      }
    },
    {
      name: 'getUserById',  
      method: "get",
      path: '/:id',
      controller: async (req, res) => {    
        try {
          const { id } = req.params;
          const user = await router.service.findUserById(id);
          if (!user) {
            return res.status(404).send(new NotFoundError(`User not found`));
          }
          return res.status(200).send(user); 
        } catch (error) {
          return res.send(new InternalServerError(error));
        }
      }
    },
    {
      name: 'createUser',
      method: "post",
      path: '',
      controller: async (req, res) => {
        try {
          await router.service.addUser(req.body);
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
        const user = await router.service.deleteUserById(id);
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

export default router.routes;