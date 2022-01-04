import { JwtPayload } from 'jsonwebtoken';

export interface WashswotJwtInterface extends Partial<JwtPayload> {
  userUUID: string;
  iss: string;
  aud: string;
  iat: number;
}
