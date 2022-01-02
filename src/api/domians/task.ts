import { Information } from './information';
import { Mission } from './mission';

export interface CreateTaskDto {
  taskId: number;
  information: Information;
  mission: Mission;
}

export class Task {
  private taskId: number;
  private information: Information;
  private mission: Mission;
  constructor({ taskId, information, mission }: CreateTaskDto) {
    this.taskId = taskId;
    this.information = information;
    this.mission = mission;
  }
}
