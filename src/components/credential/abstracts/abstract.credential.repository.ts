import { AbstractRepository } from 'typeorm';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';

export abstract class AbstractCredentialRepository extends AbstractRepository<Credential> {
  abstract createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential;
}
