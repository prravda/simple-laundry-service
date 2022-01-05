import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { CreateTokenDto } from '../dto/create-token.dto';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { WashswotJwtInterface } from '../interface/washswot-jwt.interface';

export abstract class AbstractAuthService extends AbstractService {
  abstract createToken(createTokenDto: CreateTokenDto): string;
  abstract verifyToken(verifyTokenDto: VerifyTokenDto): WashswotJwtInterface;
}
