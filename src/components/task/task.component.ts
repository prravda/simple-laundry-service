import { AbstractComponent } from '../../constants/abstracts/abstract.component';
import { AbstractController } from '../../constants/abstracts/abstract.controller';
import { AbstractTaskController } from './abstracts/abstract.task.controller';

export class TaskComponent extends AbstractComponent {
  constructor(private taskController: AbstractTaskController) {
    super();
  }
  getController(): AbstractController {
    return this.taskController;
  }
}
