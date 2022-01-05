import { TokenType } from '../types/token-type';

export interface CreateTokenDto {
  tokenType: TokenType;
  uuid: string;
}
