import { AbstractCredentialRepository } from '../abstracts/abstract.credential.repository';
import {
  CreateCredentialDto,
  Credential,
} from '../../../database/entities/credential';
import { Repository } from 'typeorm';
import { WashswatConnectionManager } from '../../../database/washswat-connection-manager';
import { UpdateCredentialByUuidDto } from '../dto/update-credential-by-uuid.dto';
import { User } from '../../../database/entities/user';

export class CredentialRepository extends AbstractCredentialRepository {
  constructor() {
    super();
  }
  private getRepository(): Repository<Credential> {
    return WashswatConnectionManager.getConnection().getRepository(Credential);
  }

  public createCredential(
    createCredentialDto: CreateCredentialDto,
  ): Credential {
    return this.getRepository().create(createCredentialDto);
  }

  public async updateCredential(
    updateCredentialByUuidDto: UpdateCredentialByUuidDto,
  ) {
    try {
      const { uuid, refreshToken } = updateCredentialByUuidDto;
      const tempUserRepository =
        WashswatConnectionManager.getConnection().getRepository(User);
      const userToUpdateWithCredentialInformation =
        await tempUserRepository.findOne(
          { uuid },
          { relations: ['credential'] },
        );
      if (
        userToUpdateWithCredentialInformation &&
        userToUpdateWithCredentialInformation.credential
      ) {
        userToUpdateWithCredentialInformation.credential.refreshToken =
          refreshToken;
        const savedResult = await tempUserRepository.save(
          userToUpdateWithCredentialInformation,
        );
        if (savedResult) {
          return true;
        }
      }
      return false;
    } catch (e) {
      throw e;
    }
  }
}
