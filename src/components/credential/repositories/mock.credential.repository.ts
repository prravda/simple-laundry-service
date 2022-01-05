import { AbstractCredentialRepository } from '../abstracts/abstract.credential.repository';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';

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
}
