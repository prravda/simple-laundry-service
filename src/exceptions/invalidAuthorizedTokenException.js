import CommonException from './commonException';

export default class InvalidAuthorizedTokenError extends CommonException {
  constructor(message) {
    super(500, message);
  }
}
