import { AbstractToken } from '../abstracts/abstract.token';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '../../../config';

export class AccessToken extends AbstractToken {
  constructor(private createTokenDto: CreateAccessTokenDto) {
    super();
  }

  public createToken(): string {
    return jwt.sign(this.createTokenDto, getConfig().jwtSecret, {
      algorithm: 'HS256',
      expiresIn: getConfig().accessTokenExpiresIn,
      audience: getConfig().jwtAudience,
      issuer: getConfig().jwtIssuer,
    });
  }
}
