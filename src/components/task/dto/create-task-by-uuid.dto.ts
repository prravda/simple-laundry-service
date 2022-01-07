import { CreateAndSaveTaskDto } from '../../../database/entities/task';

export interface CreateTaskByUuidDto {
  uuid: string;
  taskInformation: CreateAndSaveTaskDto;
}
