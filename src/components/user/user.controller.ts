import { AbstractUserController } from './abstracts/abstract.user.controller';
import { Router } from 'express';
import { CreateUserDto } from '../../database/entities/user';
import { AbstractFacadeUserService } from './abstracts/abstract.facade.user.service';
import { CreateAddressDto } from '../../database/entities/address';
import passport from 'passport';
import { WashSwotStrategy } from '../auth/strategies/wash-swot-strategy';
import { AuthorizedUserInterface } from '../auth/interface/authorized-user.interface';

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

    router.get(
      '/me',
      passport.authenticate(WashSwotStrategy, { session: false }),
      async (req, res) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const user = await this.userService.findUserByUUID({ uuid });
        res.send(user);
      },
    );

    this.userRouter.use(path, router);
  }

  public getRouter() {
    return this.userRouter;
  }
}
