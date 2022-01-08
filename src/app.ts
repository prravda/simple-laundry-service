import express, { Router } from 'express';
import { getConfig } from './config';
import { AbstractComponent } from './constants/abstracts/abstract.component';
import { exceptionFilter } from './middlewares/exception-filter';

export class App {
  private application;
  constructor(private components: AbstractComponent[]) {
    this.application = express();
    this.application.use(express.json());
    this.initializeComponents();
    this.initializeExceptionFilter();
  }

  public listen() {
    const port = parseInt(getConfig().portNumber) || 3000;
    this.application.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  }

  private initializeExceptionFilter() {
    this.application.use(exceptionFilter);
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
