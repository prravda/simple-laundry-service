import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { CreateAccessTokenDto } from '../dto/create-access-token.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { WashswotJwtInterface } from '../interface/washswot-jwt.interface';
import { CreateRefreshTokenDto } from '../dto/create-refresh-token.dto';

export abstract class AbstractAuthService extends AbstractService {
  abstract createAccessToken(
    createAccessTokenDto: CreateAccessTokenDto,
  ): string;
  abstract createRefreshToken(
    createRefreshTokenDto: CreateRefreshTokenDto,
  ): string;
  abstract verifyToken(verifyTokenDto: VerifyTokenDto): WashswotJwtInterface;
}
