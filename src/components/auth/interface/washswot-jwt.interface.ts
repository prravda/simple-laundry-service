import { JwtPayload } from 'jsonwebtoken';

export interface WashswotJwtInterface extends Partial<JwtPayload> {
  uuid: string;
  iss: string;
  aud: string;
  iat: number;
}
