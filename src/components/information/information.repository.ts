import { AbstractInformationRepository } from './abstracts/abstract.information.repository';
import { WashswotConnectionManager } from '../../database/washswot-connection-manager';
import {
  CreateInformationDto,
  Information,
} from '../../database/entities/information';
import { DeepPartial } from 'typeorm';

export class InformationRepository extends AbstractInformationRepository {
  constructor() {
    super();
  }
  private getRepository() {
    return WashswotConnectionManager.getConnection().getRepository(Information);
  }

  public createInformation(
    createInformationDto: CreateInformationDto,
  ): Information {
    return this.getRepository().create(createInformationDto);
  }

  public async saveInformation(
    createInformationDto: DeepPartial<Information>,
  ): Promise<Information> {
    return await this.getRepository().save(createInformationDto);
  }
}
