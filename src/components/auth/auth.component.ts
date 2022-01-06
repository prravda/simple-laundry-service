import { AbstractComponent } from '../../constants/abstracts/abstract.component';
import { AbstractAuthController } from './abstracts/abstract.auth.controller';
import { AbstractController } from '../../constants/abstracts/abstract.controller';

export class AuthComponent extends AbstractComponent {
  constructor(private authController: AbstractAuthController) {
    super();
  }
  getController(): AbstractController {
    return this.authController;
  }
}
