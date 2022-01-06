import { AbstractService } from '../../../constants/abstracts/abstract.service';
import {
  CreateTimeDto,
  Time,
  UpdateTimeByTimeIdDto,
} from '../../../database/entities/time';

export abstract class AbstractTimeService extends AbstractService {
  abstract createTime(createTimeDto: CreateTimeDto): Promise<Time>;
  abstract updateTimeByTimeId(
    updateTimeDto: UpdateTimeByTimeIdDto,
  ): Promise<Time>;
}
