import { AbstractRepository } from 'typeorm';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';
import { UpdateCredentialByUuidDto } from '../dto/update-credential-by-uuid.dto';
export abstract class AbstractCredentialRepository extends AbstractRepository<Credential> {
  abstract createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential;
  abstract updateCredential(
    updateCredentialByUuidDto: UpdateCredentialByUuidDto,
  ): Promise<boolean>;
}
