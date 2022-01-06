import { AbstractRepository, DeepPartial } from 'typeorm';
import {
  CreateTimeDto,
  FindTimeByTimeId,
  Time,
  UpdateTimeByTimeIdDto,
} from '../../../database/entities/time';

export abstract class AbstractTimeRepository extends AbstractRepository<Time> {
  abstract insertTime(createTimeDto: CreateTimeDto): Promise<Time>;
  abstract findTimeByTimeId(findTimeByTimeId: FindTimeByTimeId): Promise<Time>;
  abstract updateTimeByTimeId(
    updateTimeDto: UpdateTimeByTimeIdDto,
  ): Promise<Time>;
  abstract saveTime(time: Time): Promise<Time>;
}
