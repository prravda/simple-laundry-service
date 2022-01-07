import {
  AbstractRepository,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
} from 'typeorm';
import { Task } from '../../../database/entities/task';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SoftDeleteCriteriaType } from '../../../constants/types/soft-delete-criteria.type';

export abstract class AbstractTaskRepository extends AbstractRepository<Task> {
  abstract save(deepPartialTask: DeepPartial<Task>): Promise<Task>;
  abstract create(): Task;
  abstract findAll(conditions: FindManyOptions<Task>): Promise<Task[]>;
  abstract findOne(conditions: FindOneOptions<Task>): Promise<Task>;
  abstract find(conditions: FindManyOptions<Task>): Promise<Task[]>;
  abstract softDelete(
    deleteOption: SoftDeleteCriteriaType<Task>,
  ): Promise<UpdateResult>;
}
