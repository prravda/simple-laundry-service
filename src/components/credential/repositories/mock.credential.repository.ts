import { AbstractCredentialRepository } from '../abstracts/abstract.credential.repository';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';
import { UpdateCredentialByUuidDto } from '../dto/update-credential-by-uuid.dto';

export class MockCredentialRepository extends AbstractCredentialRepository {
  constructor() {
    super();
  }
  public createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential {
    const mockCredential = new Credential();
    mockCredential.refreshToken = createCredentialDto.refreshToken;
    return mockCredential;
  }

  updateCredential(
    updateCredentialByUuidDto: UpdateCredentialByUuidDto,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
