export interface CreateSuccessResponseWrapper<T> {
  message: string;
  status: string;
  data: T;
}

export class SuccessResponseWrapper<T> {
  private readonly _message: string;
  private readonly _status: string;
  private readonly _data: T;
  constructor({ message, status, data }: CreateSuccessResponseWrapper<T>) {
    this._message = message;
    this._status = status;
    this._data = data;
  }

  get message(): string {
    return this._message;
  }

  get status(): string {
    return this._status;
  }

  get data(): T {
    return this._data;
  }
}
