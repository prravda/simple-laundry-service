import { AbstractCredentialRepository } from '../abstracts/abstract.credential.repository';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';
import { Repository } from 'typeorm';
import { WashswotConnectionManager } from '../../../database/washswot-connection-manager';

export class CredentialRepository extends AbstractCredentialRepository {
  constructor() {
    super();
  }
  private getRepository(): Repository<Credential> {
    return WashswotConnectionManager.getConnection().getRepository(Credential);
  }

  createCredential(createCredentialDto: CreateCredentialDto): Credential {
    return this.getRepository().create(createCredentialDto);
  }
}
