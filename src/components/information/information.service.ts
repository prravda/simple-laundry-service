import { AbstractInformationService } from './abstracts/abstract.information.service';
import {
  CreateInformationDto,
  Information,
} from '../../database/entities/information';
import { DeepPartial } from 'typeorm';
import { AbstractInformationRepository } from './abstracts/abstract.information.repository';

export class InformationService extends AbstractInformationService {
  constructor(
    private readonly informationRepository: AbstractInformationRepository,
  ) {
    super();
  }
  public createInformation(
    createInformationDto: CreateInformationDto,
  ): Information {
    return this.informationRepository.createInformation(createInformationDto);
  }

  public async saveInformation(
    createInformationDto: DeepPartial<Information>,
  ): Promise<Information> {
    return await this.informationRepository.saveInformation(
      createInformationDto,
    );
  }
}
