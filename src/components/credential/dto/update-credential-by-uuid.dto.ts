export interface UpdateCredentialByUuidDto {
  uuid: string;
  refreshToken: string;
}

export type UpdateCredentialDto = Pick<UpdateCredentialByUuidDto, 'uuid'>;
