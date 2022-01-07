import { AbstractRepository, DeepPartial } from 'typeorm';
import { Information } from '../../../database/entities/information';
import { CreateMissionDto, Mission } from '../../../database/entities/mission';

export abstract class AbstractMissionRepository extends AbstractRepository<Mission> {
  abstract create(createMissionDto: CreateMissionDto): Mission;

  abstract save(
    deepPartialInformation: DeepPartial<Information>,
  ): Promise<Mission>;

  abstract createAndSave(createMissionDto: CreateMissionDto): Promise<Mission>;
}
