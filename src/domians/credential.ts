import { UpdateRefreshTokenDto } from '../components/credential/dto/update-refresh-token.dto';

export interface CreateCredentialDto {
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Credential {
  private _refreshToken: string;
  private _createdAt: Date;
  private _updatedAt: Date;
  constructor({ refreshToken, createdAt, updatedAt }: CreateCredentialDto) {
    this._refreshToken = refreshToken;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  get refreshToken(): string {
    return this._refreshToken;
  }

  set refreshToken(value: string) {
    this._refreshToken = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public updateRefreshToken({
    refreshToken,
    updatedAt,
  }: UpdateRefreshTokenDto) {
    this.refreshToken = refreshToken;
    this.updatedAt = updatedAt;
  }
}
