import express from 'express';
import { JWT_SECRET } from './config';

export class App {
  private app;
  constructor() {
    this.app = express();
  }
  private listen() {
    const port = JWT_SECRET || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }

  private initializeControllers() {}

  private initializeErrorHandling() {}

  private initializeAuthentication() {}
}
