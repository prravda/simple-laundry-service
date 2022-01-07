import { AbstractRepository, DeepPartial } from 'typeorm';
import {
  CreateInformationDto,
  Information,
} from '../../../database/entities/information';

export abstract class AbstractInformationRepository extends AbstractRepository<Information> {
  abstract createInformation(
    createInformationDto: CreateInformationDto,
  ): Information;
  abstract saveInformation(
    createInformationDto: DeepPartial<Information>,
  ): Promise<Information>;
}
