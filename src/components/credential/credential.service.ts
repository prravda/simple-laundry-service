import { AbstractCredentialService } from './abstracts/abstract.credential.service';
import { CreateCredentialDto } from '../../domians/credential';
import { DatabaseObject } from '../../libs/database-object';

export class CredentialService extends AbstractCredentialService {
  private connection;
  constructor() {
    super();
    this.connection = DatabaseObject.getDatabase();
  }
  createCredential(createCredentialDto: CreateCredentialDto): void {
    const { refreshToken, createdAt, updatedAt } = createCredentialDto;
    const insert = this.connection.prepare(
      'INSERT INTO credentials (refresh_token, created_at, updated_at) VALUES (?, ?, ?)',
    );
    insert.run(refreshToken, createdAt, updatedAt);
  }
}
