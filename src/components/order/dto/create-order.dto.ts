import { Information } from '../../../database/entities/information';
import { Mission } from '../../../database/entities/mission';

export interface CreateOrderDto {
  taskId: number;
  information: Information;
  mission: Mission;
}
