import { AbstractService } from '../../../constants/abstracts/abstract.service';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';

export abstract class AbstractCredentialService extends AbstractService {
  abstract createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential;
}
