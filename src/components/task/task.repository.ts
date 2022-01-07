import { AbstractTaskRepository } from './abstracts/abstract.task.repository';
import { WashswotConnectionManager } from '../../database/washswot-connection-manager';
import { Task } from '../../database/entities/task';
import { DeepPartial, FindManyOptions, FindOneOptions } from 'typeorm';
import { SoftDeleteCriteriaType } from '../../constants/types/soft-delete-criteria.type';

export class TaskRepository extends AbstractTaskRepository {
  constructor() {
    super();
  }
  private getRepository() {
    return WashswotConnectionManager.getConnection().getRepository(Task);
  }
  async save(deepPartialTask: DeepPartial<Task>): Promise<Task> {
    return await this.getRepository().save(deepPartialTask);
  }

  create(): Task {
    return new Task();
  }

  async findOne(conditions: FindOneOptions<Task>): Promise<Task> {
    try {
      const result = await this.getRepository().findOne({
        ...conditions,
      });
      if (result) {
        return result;
      }
      throw new Error('cannot find tasks with this uuid');
    } catch (e) {
      throw e;
    }
  }

  async find(conditions: FindManyOptions<Task>): Promise<Task[]> {
    return await this.getRepository().find({
      ...conditions,
      relations: [
        'information',
        'information.time',
        'mission',
        'mission.items',
        'mission.items.images',
        'mission.items.tagList',
      ],
    });
  }

  async softDelete(deleteOption: SoftDeleteCriteriaType<Task>) {
    return await this.getRepository().softDelete(deleteOption);
  }

  async findAll(conditions: FindManyOptions<Task>): Promise<Task[]> {
    return await this.getRepository().find({
      relations: [
        'information',
        'information.time',
        'mission',
        'mission.items',
        'mission.items.images',
        'mission.items.tagList',
      ],
    });
  }
}
