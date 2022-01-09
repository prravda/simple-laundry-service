import { AbstractMissionRepository } from './abstracts/abstract.mission.repository';
import { WashswatConnectionManager } from '../../database/washswat-connection-manager';
import { Information } from '../../database/entities/information';
import { DeepPartial } from 'typeorm';
import { CreateMissionDto, Mission } from '../../database/entities/mission';

export class MissionRepository extends AbstractMissionRepository {
  constructor() {
    super();
  }
  private getRepository() {
    return WashswatConnectionManager.getConnection().getRepository(Mission);
  }

  public create(createMissionDto: CreateMissionDto): Mission {
    return this.getRepository().create(createMissionDto);
  }

  public async save(
    deepPartialEntity: DeepPartial<Information>,
  ): Promise<Mission> {
    return await this.getRepository().save(deepPartialEntity);
  }

  public async createAndSave(
    createMissionDto: CreateMissionDto,
  ): Promise<Mission> {
    const entity = this.create(createMissionDto);
    return await this.save(entity);
  }
}
