import { TokenType } from '../types/token-type';

export interface CreateAccessTokenDto {
  tokenType: TokenType;
  uuid: string;
}
