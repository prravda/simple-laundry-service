import * as jwt from 'jsonwebtoken';
import { VerifyTokenDto } from '../dto/verify-token.dto';
import { getConfig } from '../../../config';

export abstract class AbstractToken {
  abstract createToken(): string;
}
