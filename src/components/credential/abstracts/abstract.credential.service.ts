import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { CreateCredentialDto, Credential } from '../../../domians/credential';

export abstract class AbstractCredentialService extends AbstractService {
  abstract createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential;
}
