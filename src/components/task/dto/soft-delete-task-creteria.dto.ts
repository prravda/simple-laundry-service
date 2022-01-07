import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm';
import { Task } from '../../../database/entities/task';

export type SoftDeleteTaskCriteria =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindConditions<Task>;
