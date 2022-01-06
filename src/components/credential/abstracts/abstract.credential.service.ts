import { AbstractService } from '../../../constants/abstracts/abstract.service';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';
import { UpdateCredentialByUuidDto } from '../dto/update-credential-by-uuid.dto';

export abstract class AbstractCredentialService extends AbstractService {
  abstract createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential;
  abstract updateCredentialByUUID(
    updateCredentialByUuidDto: UpdateCredentialByUuidDto,
  ): Promise<boolean>;
}
