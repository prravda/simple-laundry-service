import { AbstractUserController } from './abstracts/abstract.user.controller';
import { Router } from 'express';
import { CreateUserDto } from '../../database/entities/user';
import { AbstractFacadeUserService } from './abstracts/abstract.facade.user.service';
import { CreateAddressDto } from '../../database/entities/address';

export class UserController extends AbstractUserController {
  private readonly userRouter;
  constructor(private readonly userService: AbstractFacadeUserService) {
    super();
    this.userRouter = Router();
    this.initializeRouter();
  }

  public initializeRouter() {
    const router = Router();
    const path = '/user';

    router.post('/', async (req, res) => {
      const createUserDtoWithAddressInformation = req.body as CreateUserDto &
        CreateAddressDto;
      const result = await this.userService.insertUser(
        createUserDtoWithAddressInformation,
      );
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
