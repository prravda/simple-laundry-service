import { AbstractService } from '../../../constants/abstracts/abstract.service';
import {
  CreateInformationDto,
  Information,
} from '../../../database/entities/information';
import { DeepPartial } from 'typeorm';

export abstract class AbstractInformationService extends AbstractService {
  abstract createInformation(
    createInformationDto: CreateInformationDto,
  ): Information;
  abstract saveInformation(
    createInformationDto: DeepPartial<Information>,
  ): Promise<Information>;
}
