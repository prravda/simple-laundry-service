import { AbstractTaskService } from './abstracts/abstract.task.service';
import { Task } from '../../database/entities/task';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  UpdateResult,
} from 'typeorm';
import { AbstractTaskRepository } from './abstracts/abstract.task.repository';
import { SoftDeleteCriteriaType } from '../../constants/types/soft-delete-criteria.type';

export class TaskService extends AbstractTaskService {
  constructor(private readonly taskRepository: AbstractTaskRepository) {
    super();
  }
  save(deepPartialTask: DeepPartial<Task>): Promise<Task> {
    return this.taskRepository.save(deepPartialTask);
  }

  create(): Task {
    return this.taskRepository.create();
  }

  findAll(conditions: FindManyOptions<Task>): Promise<Task[]> {
    return this.taskRepository.findAll(conditions);
  }

  findOne(conditions: FindOneOptions<Task>): Promise<Task> {
    return this.taskRepository.findOne(conditions);
  }

  find(conditions: FindManyOptions<Task>): Promise<Task[]> {
    return this.taskRepository.find(conditions);
  }

  softDelete(
    deleteOption: SoftDeleteCriteriaType<Task>,
  ): Promise<UpdateResult> {
    return this.taskRepository.softDelete(deleteOption);
  }
}
