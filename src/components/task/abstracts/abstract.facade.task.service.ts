import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { Task } from '../../../database/entities/task';
import { CreateTaskByUuidDto } from '../dto/create-task-by-uuid.dto';
import { FindTaskByUuidDto } from '../dto/find-task-by-uuid.dto';
import { FindTaskByTaskIdDto } from '../dto/find-task-by-task-id.dto';
import { DeleteTaskByTaskIdDto } from '../dto/delete-task-by-task-id.dto';
import { UpdateResult } from 'typeorm';

export abstract class AbstractFacadeTaskService extends AbstractService {
  abstract createTaskByUUID(
    createTaskDtoByUuid: CreateTaskByUuidDto,
  ): Promise<Task>;
  abstract findAllTask(): Promise<Task[]>;
  abstract findTaskByUUID(
    findTaskByUuidDto: FindTaskByUuidDto,
  ): Promise<Task[]>;
  abstract findTaskByTaskId(
    findTaskByTaskIdDto: FindTaskByTaskIdDto,
  ): Promise<Task>;
  abstract deleteTaskByTaskId(
    deleteTaskByTaskIdDto: DeleteTaskByTaskIdDto,
  ): Promise<UpdateResult>;
}
