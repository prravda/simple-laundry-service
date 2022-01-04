import { FindOrderByUuidDto } from './find-order-by-uuid.dto';

export interface FindOrderByTaskIdDto extends FindOrderByUuidDto {
  taskId: number;
}
