import { AbstractController } from './abstract.controller';

export abstract class AbstractComponent {
  public abstract getController(): AbstractController;
}
