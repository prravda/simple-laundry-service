import { AbstractCredentialService } from './abstracts/abstract.credential.service';
import {
  CreateCredentialDto,
  Credential,
} from '../../database/entities/credential';
import { DatabaseObject } from '../../database/typeorm-connection';

export class CredentialService extends AbstractCredentialService {
  private connection;
  constructor() {
    super();
    this.connection = DatabaseObject.getDatabase();
  }
  createCredential(createCredentialDto: CreateCredentialDto): Credential {
    const { refreshToken, createdAt, updatedAt } = createCredentialDto;
    const insert = this.connection.prepare(
      'INSERT INTO credentials (refresh_token, created_at, updated_at) VALUES (?, ?, ?)',
    );
    return insert.run(refreshToken, createdAt, updatedAt);
  }
}
