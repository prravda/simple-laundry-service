import CommonException from './commonException';

export default class BadRequestException extends CommonException {
  constructor(message) {
    super(500, message);
  }
}
