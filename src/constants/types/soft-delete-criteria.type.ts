import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm';

export type SoftDeleteCriteriaType<T> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectID
  | ObjectID[]
  | FindConditions<T>;
