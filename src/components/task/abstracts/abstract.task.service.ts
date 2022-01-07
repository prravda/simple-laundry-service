import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { Task } from '../../../database/entities/task';
import { SoftDeleteCriteriaType } from '../../../constants/types/soft-delete-criteria.type';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';

export abstract class AbstractTaskService extends AbstractService {
  abstract save(deepPartialTask: DeepPartial<Task>): Promise<Task>;
  abstract create(): Task;
  abstract findAll(findManyOptions: FindManyOptions<Task>): Promise<Task[]>;
  abstract findOne(conditions: FindOneOptions<Task>): Promise<Task>;
  abstract find(conditions: FindManyOptions<Task>): Promise<Task[]>;
  abstract softDelete(
    deleteOption: SoftDeleteCriteriaType<Task>,
  ): Promise<UpdateResult>;
}
