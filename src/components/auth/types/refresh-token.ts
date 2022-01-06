import { AbstractToken } from '../abstracts/abstract.token';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '../../../config';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

export class RefreshToken extends AbstractToken {
  constructor(private createTokenDto: CreateRefreshTokenDto) {
    super();
  }

  public createToken(): string {
    const { uuid } = this.createTokenDto;
    return jwt.sign({ uuid }, getConfig().jwtSecret, {
      algorithm: 'HS256',
      expiresIn: getConfig().refreshTokenExpiresIn,
      audience: getConfig().jwtAudience,
      issuer: getConfig().jwtIssuer,
    });
  }
}
