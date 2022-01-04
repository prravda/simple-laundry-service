import express, { Express, Router } from 'express';
import { getConfig } from './config';
import { AbstractComponent } from './constants/abstracts/abstract.component';

export class App {
  private application;
  constructor(private components: AbstractComponent[]) {
    this.application = express();
    this.application.use(express.json());
    this.initializeComponents();
  }

  public listen() {
    const port = parseInt(getConfig().portNumber) || 3000;
    this.application.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }

  private initializeComponents() {
    const router = Router();
    router.get('/', (req, res) => {
      res.send('hello world !');
    });
    router.post('/', (req, res) => {
      res.send(`echo: ${JSON.stringify(req.body)}`);
    });
    this.components.forEach((components) => {
      router.use(components.getController().getRouter());
    });
    this.application.use('/api', router);
  }
}