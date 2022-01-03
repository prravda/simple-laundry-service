import express from 'express';

export class NewApp {
  private app;
  constructor() {
    this.app = express();
    // TODO: setup other bootstrap functions, for example set controllers, or else... for this application
  }
}
