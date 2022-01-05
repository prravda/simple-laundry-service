import { TokenType } from '../types/token-type';

export interface CreateRefreshTokenDto {
  tokenType: TokenType;
  uuid: string;
}
