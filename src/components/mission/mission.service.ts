import { AbstractMissionService } from './abstracts/abstract.mission.service';
import { Information } from '../../database/entities/information';
import { DeepPartial } from 'typeorm';
import { AbstractMissionRepository } from './abstracts/abstract.mission.repository';
import { CreateMissionDto, Mission } from '../../database/entities/mission';

export class MissionService extends AbstractMissionService {
  constructor(private readonly missionRepository: AbstractMissionRepository) {
    super();
  }

  public create(createMissionDto: CreateMissionDto): Mission {
    return this.missionRepository.create(createMissionDto);
  }

  public async createAndSave(
    createMissionDto: CreateMissionDto,
  ): Promise<Mission> {
    return await this.missionRepository.createAndSave(createMissionDto);
  }

  public async save(
    deepPartialInformation: DeepPartial<Information>,
  ): Promise<Mission> {
    return this.missionRepository.save(deepPartialInformation);
  }
}
