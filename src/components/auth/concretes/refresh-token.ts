import { AbstractToken } from '../abstracts/abstract.token';
import { CreateTokenDto } from '../dto/create-token.dto';
import * as jwt from 'jsonwebtoken';
import { getConfig } from '../../../config';

export class RefreshToken extends AbstractToken {
  constructor(private createTokenDto: CreateTokenDto) {
    super();
  }

  public createToken(): string {
    const { userUUID } = this.createTokenDto;
    return jwt.sign({ userUUID }, getConfig().jwtSecret, {
      algorithm: 'HS256',
      expiresIn: getConfig().refreshTokenExpiresIn,
      audience: getConfig().jwtAudience,
      issuer: getConfig().jwtIssuer,
    });
  }
}
