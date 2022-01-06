import { AbstractService } from '../../../constants/abstracts/abstract.service';
export abstract class AbstractTaskService extends AbstractService {
  abstract createTask();
}
