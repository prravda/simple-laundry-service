import { AbstractAuthService } from './abstracts/abstract.auth.service';
import { CreateTokenDto } from './dto/create-token.dto';
import { AccessToken } from './concretes/access-token';
import { RefreshToken } from './concretes/refresh-token';
import { VerifyTokenDto } from './dto/verify-token.dto';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '../../config';
import { DecodeTokenDto } from './dto/decode-token.dto';
import { WashswotJwtInterface } from './interface/washswot-jwt.interface';

export class AuthService extends AbstractAuthService {
  constructor() {
    super();
  }

  private validateVerifyResult(result: any): boolean {
    // validate 여부를 token 을 만들 때 사용한 userUUID 가 있는지 여부로 검사함
    return result.userUUID;
  }

  private decodeToken(decodeTokenDto: DecodeTokenDto): WashswotJwtInterface {
    try {
      const { token } = decodeTokenDto;
      const result = jwt.verify(token, getConfig().jwtSecret, {
        audience: getConfig().jwtAudience,
        issuer: getConfig().jwtIssuer,
      });
      if (this.validateVerifyResult(result)) {
        return result as WashswotJwtInterface;
      }
      throw new Error('invalid token');
    } catch (e) {
      throw e;
    }
  }

  public createToken(createTokenDto: CreateTokenDto): string {
    try {
      const { tokenType } = createTokenDto;
      // access token 인 경우
      if (tokenType === 'access') {
        const token = new AccessToken(createTokenDto);
        return token.createToken();
      }
      // refresh token 인 경우
      if (tokenType === 'refresh') {
        const token = new RefreshToken(createTokenDto);
        return token.createToken();
      }
      throw new Error('error: invalid token creation');
    } catch (e) {
      throw e;
    }
  }

  public verifyToken(verifyTokenDto: VerifyTokenDto): WashswotJwtInterface {
    const { token } = verifyTokenDto;
    const verifyResult = jwt.verify(token, getConfig().jwtSecret, {
      audience: getConfig().jwtAudience,
      issuer: getConfig().jwtIssuer,
    });
    return verifyResult as WashswotJwtInterface;
  }
}
