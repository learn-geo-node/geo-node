import { queryRouter } from './query.routes';
import { mutationRouter } from './mutation.routes';

export default [...queryRouter.routes, ...mutationRouter.routes];