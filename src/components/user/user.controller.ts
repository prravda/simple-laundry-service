import { AbstractUserController } from './abstracts/abstract.user.controller';
import { Router } from 'express';
import { CreateUserDto, User } from '../../database/entities/user';
import { AbstractFacadeUserService } from './abstracts/abstract.facade.user.service';
import { CreateAddressDto } from '../../database/entities/address';
import passport from 'passport';
import { WashSwotStrategy } from '../auth/strategies/wash-swot-strategy';
import { AuthorizedUserInterface } from '../auth/interface/authorized-user.interface';
import { successResponseWrapper } from '../../middlewares/response-wrappers/success-response.wrapper';
import { AccessAndRefreshTokenInterface } from '../auth/interface/access-and-refresh-token.interface';

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
      res.status(201).send(
        successResponseWrapper<AccessAndRefreshTokenInterface>({
          message: 'success signing up',
          statusCode: res.statusCode,
          data: result,
        }),
      );
    });

    router.get(
      '/me',
      passport.authenticate(WashSwotStrategy, { session: false }),
      async (req, res) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const user = await this.userService.findUserByUUID({ uuid });
        res.status(200).send(
          successResponseWrapper<User>({
            message: `success getting an user's information`,
            statusCode: res.statusCode,
            data: user,
          }),
        );
      },
    );

    this.userRouter.use(path, router);
  }

  public getRouter() {
    return this.userRouter;
  }
}
