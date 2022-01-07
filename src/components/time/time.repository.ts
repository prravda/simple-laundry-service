import { AbstractTimeRepository } from './abstracts/abstract.time.repository';
import { WashswotConnectionManager } from '../../database/washswot-connection-manager';
import {
  CreateTimeDto,
  FindTimeByTimeId,
  Time,
  UpdateTimeByTimeIdDto,
} from '../../database/entities/time';

export class TimeRepository extends AbstractTimeRepository {
  private getRepository() {
    return WashswotConnectionManager.getConnection().getRepository(Time);
  }

  public createTime(createTimeDto: CreateTimeDto): Time {
    return this.getRepository().create(createTimeDto);
  }

  public async findTimeByTimeId(
    findTimeByTimeId: FindTimeByTimeId,
  ): Promise<Time> {
    try {
      const { id } = findTimeByTimeId;
      const result = await this.getRepository().findOne({ id });
      if (result) {
        return result;
      }
      throw new Error(`cannot find time record with this id: ${id}`);
    } catch (e) {
      throw e;
    }
  }

  public async insertTime(createTimeDto: CreateTimeDto): Promise<Time> {
    try {
      return await this.getRepository().save(createTimeDto);
    } catch (e) {
      throw e;
    }
  }

  public async saveTime(time: Time): Promise<Time> {
    try {
      return await this.getRepository().save(time);
    } catch (e) {
      throw e;
    }
  }

  public async updateTimeByTimeId(
    updateTimeDto: UpdateTimeByTimeIdDto,
  ): Promise<Time> {
    try {
      const { id, ...informationToUpdate } = updateTimeDto;
      const timeEntityToUpdate = await this.getRepository().findOne({ id });
      if (timeEntityToUpdate) {
        return await this.getRepository().save({
          ...timeEntityToUpdate,
          ...informationToUpdate,
        });
      }
      throw new Error(`cannot find with this ${id}`);
    } catch (e) {
      throw e;
    }
  }
}
