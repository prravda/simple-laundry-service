import { AbstractTimeService } from './abstracts/abstract.time.service';
import {
  CreateTimeDto,
  Time,
  UpdateTimeByTimeIdDto,
} from '../../database/entities/time';
import { AbstractTimeRepository } from './abstracts/abstract.time.repository';

export class TimeService extends AbstractTimeService {
  constructor(private timeRepository: AbstractTimeRepository) {
    super();
  }
  private validateCreateTimeDto(createTimeDto: CreateTimeDto): boolean {
    const { pickup, pickupEnd, delivery, deliveryEnd } = createTimeDto;
    if (pickupEnd < pickup || deliveryEnd < delivery) {
      return false;
    }
    return true;
  }

  public async createTime(createTimeDto: CreateTimeDto): Promise<Time> {
    try {
      const isValid = this.validateCreateTimeDto(createTimeDto);
      if (isValid) {
        return await this.timeRepository.insertTime(createTimeDto);
      }
      throw new Error('invalid time input');
    } catch (e) {
      throw e;
    }
  }

  public async updateTimeByTimeId(
    updateTimeDto: UpdateTimeByTimeIdDto,
  ): Promise<Time> {
    const timeEntityToUpdate = await this.timeRepository.findTimeByTimeId({
      id: updateTimeDto.id,
    });
    const updatedTimeEntity = {
      ...timeEntityToUpdate,
      updateTimeDto,
    };
    return await this.timeRepository.saveTime(updatedTimeEntity);
  }
}
