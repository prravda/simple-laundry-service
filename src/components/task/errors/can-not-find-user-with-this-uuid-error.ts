import {
  AbstractCustomError,
  CreateCustomError,
} from '../../../middlewares/abstract.custom.error';

export class CanNotFindUserWithThisUuidError extends AbstractCustomError {
  private readonly _message: string;
  private readonly _name: string;
  private readonly _statusCode: number;
  private readonly _action: string;
  private readonly _solution: string;
  constructor({
    message,
    name,
    statusCode,
    action,
    solution,
  }: CreateCustomError) {
    super();
    this._name = name;
    this._message = message;
    this._statusCode = statusCode;
    this._action = action;
    this._solution = solution;
  }
  get name(): string {
    return this._name;
  }
  get message(): string {
    return this._message;
  }

  get statusCode(): number {
    return this._statusCode;
  }

  get action(): string {
    return this._action;
  }

  get solution(): string {
    return this._solution;
  }
}
