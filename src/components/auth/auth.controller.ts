import { AbstractAuthController } from './abstracts/abstract.auth.controller';
import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import { WashSwotStrategy } from './strategies/wash-swot-strategy';
import { AuthorizedUserInterface } from './interface/authorized-user.interface';
import { AbstractFacadeAuthService } from './abstracts/abstract.facade.auth.service';

export class AuthController extends AbstractAuthController {
  private readonly authRouter;
  constructor(private readonly facadeAuthService: AbstractFacadeAuthService) {
    super();
    this.authRouter = Router();
    this.initializeRouter();
  }
  public initializeRouter() {
    const router = Router();
    const path = '/auth';
    router.get(
      '/renew',
      passport.authenticate(WashSwotStrategy, { session: false }),
      async (req: Request, res: Response, next: NextFunction) => {
        const { uuid } = req.user as AuthorizedUserInterface;
        const result = await this.facadeAuthService.updateCredentialByUUID({
          uuid,
        });
        res.send(result);
      },
    );

    this.authRouter.use(path, router);
  }

  public getRouter() {
    return this.authRouter;
  }
}
