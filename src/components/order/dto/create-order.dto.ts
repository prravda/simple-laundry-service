import { Information } from '../../../domians/information';
import { Mission } from '../../../domians/mission';

export interface CreateOrderDto {
  taskId: number;
  information: Information;
  mission: Mission;
}
