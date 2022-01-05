import { AbstractCredentialService } from './abstracts/abstract.credential.service';
import {
  CreateCredentialDto,
  Credential,
} from '../../database/entities/credential';
import { AbstractCredentialRepository } from './abstracts/abstract.credential.repository';

export class CredentialService extends AbstractCredentialService {
  constructor(
    private readonly credentialRepository: AbstractCredentialRepository,
  ) {
    super();
  }
  public createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential {
    return this.credentialRepository.createCredential(createCredentialDto);
  }
}
