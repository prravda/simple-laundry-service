import { AbstractComponent } from '../../constants/abstracts/abstract.component';
import { AbstractUserController } from './abstracts/abstract.user.controller';

export class UserComponent extends AbstractComponent {
  constructor(private userController: AbstractUserController) {
    super();
  }
  getController(): AbstractUserController {
    return this.userController;
  }
}
