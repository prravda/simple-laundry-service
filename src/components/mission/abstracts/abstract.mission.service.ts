import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { Information } from '../../../database/entities/information';
import { DeepPartial } from 'typeorm';
import { CreateMissionDto, Mission } from '../../../database/entities/mission';

export abstract class AbstractMissionService extends AbstractService {
  abstract create(createMissionDto: CreateMissionDto): Mission;

  abstract save(
    deepPartialInformation: DeepPartial<Information>,
  ): Promise<Mission>;

  abstract createAndSave(createMissionDto: CreateMissionDto): Promise<Mission>;
}
