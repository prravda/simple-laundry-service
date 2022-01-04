import { AbstractUserController } from './abstracts/abstract.user.controller';
import { Request, Response, Router } from 'express';
import { AbstractUserService } from './abstracts/abstract.user.service';
import { CreateUserDto, CreateUserDtoForController } from '../../domians/user';

export class UserController extends AbstractUserController {
  private readonly userRouter;
  constructor(private readonly userService: AbstractUserService) {
    super();
    this.userRouter = Router();
    this.initializeRouter();
  }

  public initializeRouter() {
    const router = Router();
    const path = '/user';

    router.post('/', (req, res) => {
      const createUserDtoForController = req.body as CreateUserDtoForController;
      const result = this.userService.insertUser(createUserDtoForController);
      res.send(result);
    });

    router.get('/me', (req, res) => {
      res.send('user service');
    });

    this.userRouter.use(path, router);
  }

  public getRouter() {
    return this.userRouter;
  }
}
