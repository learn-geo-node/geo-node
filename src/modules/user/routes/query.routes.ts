import { InternalServerError, NotFoundError } from "@/errors";
import { UserService } from "../user.service";
import { UserRouterProps } from "../interface";

export const queryRouter: UserRouterProps = {
  service: UserService.getInstance(),
  routes: [
    {
      name: 'getAllUsers',  
      method: "get",
      path: '',
      controller: async (_, res) => {
        try {
          const user = await queryRouter.service.findAllUsers();
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
          const user = await queryRouter.service.findUserById(id);
          if (!user) {
            return res.status(404).send(new NotFoundError(`User not found`));
          }
          return res.status(200).send(user); 
        } catch (error) {
          return res.send(new InternalServerError(error));
        }
      }
    },
  ]
}