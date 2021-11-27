export default class extends Error {
  constructor(status = 500, message = 'Unknown Error') {
    super(message);
    this.status = status;
    this.message = message;
  }
}