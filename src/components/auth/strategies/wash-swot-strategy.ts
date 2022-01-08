import { Strategy, ExtractJwt } from 'passport-jwt';
import { getConfig } from '../../../config';
import { UserService } from '../../user/services/user.service';
import { UserRepository } from '../../user/repositories/user.repository';
import { WashswotJwtInterface } from '../interface/washswot-jwt.interface';
import { UnauthorizedUserError } from '../errors/unauthorized-user-error';

const unauthorizedErrorProps = {
  message: 'invalid request: unauthorized error',
  name: 'UnauthorizedUserError',
  statusCode: 401,
  action: 'Try to authorization process with invalid credentials',
  solution: 'Check your credentials validity again',
};

const unauthorizedErrorInstance = new UnauthorizedUserError(
  unauthorizedErrorProps,
);

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
    const { uuid } = jwtPayload;
    const user = await userServiceForValidation.findUserByUUID({ uuid });
    // case: find a user with a valid credential
    if (user) {
      return done(null, { uuid });
    }
    // case: else (invalid credential, valid credential but cannot find user with it)
    return done(unauthorizedErrorInstance, false, {
      ...unauthorizedErrorProps,
    });
  },
);
