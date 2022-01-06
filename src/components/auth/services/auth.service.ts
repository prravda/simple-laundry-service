import { AbstractAuthService } from '../abstracts/abstract.auth.service';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { AccessToken } from '../concretes/access-token';
import { RefreshToken } from '../concretes/refresh-token';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '../../../config';
import { DecodeTokenDto } from '../dto/decode-token.dto';
import { WashswotJwtInterface } from '../interface/washswot-jwt.interface';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

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

  public createAccessToken(createAccessTokenDto: CreateAccessTokenDto): string {
    try {
      if (createAccessTokenDto.tokenType !== 'access') {
        throw new Error('error: use valid token type');
      }
      const token = new AccessToken(createAccessTokenDto);
      return token.createToken();
    } catch (e) {
      throw e;
    }
  }

  public createRefreshToken(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): string {
    try {
      if (createRefreshTokenDto.tokenType !== 'refresh') {
        throw new Error('error: use valid token type');
      }
      const token = new RefreshToken(createRefreshTokenDto);
      return token.createToken();
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
