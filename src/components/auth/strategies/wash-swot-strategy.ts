import { Strategy, ExtractJwt } from 'passport-jwt';
import { getConfig } from '../../../config';
import { UserService } from '../../user/services/user.service';
import { UserRepository } from '../../user/repositories/user.repository';
import { WashswotJwtInterface } from '../interface/washswot-jwt.interface';
import { AuthorizedUserInterface } from '../interface/authorized-user.interface';

const userServiceForValidation = new UserService(new UserRepository());
export const WashSwotStrategy = new Strategy(
  {
    secretOrKey: getConfig().jwtSecret,
    issuer: getConfig().jwtIssuer,
    audience: getConfig().jwtAudience,
    algorithms: [getConfig().jwtAlgorithm],
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (jwtPayload: WashswotJwtInterface, done) => {
    try {
      const { uuid } = jwtPayload;
      const user = await userServiceForValidation.findUserByUUID({ uuid });
      if (user) {
        return done(null, { uuid } as AuthorizedUserInterface);
      }
      return done(new Error('invalid request'), false);
    } catch (e) {
      return done(new Error('invalid request'), false);
    }
  },
);
