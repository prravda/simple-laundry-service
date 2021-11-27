import express, { Router } from 'express';
import { verifyJWT } from './middlewares/auth';
import exceptions from './middlewares/exceptions';
class App {
  app;

  constructor(controllers) {
    this.app = express();
    this.initializeAuthenticate();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }
  listen() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`)
    })
  }
  initializeAuthenticate() {
    // TODO 더 좋은 인증 방식이 있다면 찾아주세요.
    this.app.use(express.json());
    this.app.use(verifyJWT)
  }

  initializeErrorHandling() {
    this.app.use(exceptions);
  }

  initializeControllers(controllers) {
    const router = Router();
    this.app.get('/', (req, res) => {
      res.send('OK')
    });
    controllers.forEach((controller) => {
      router.use(controller.router);
    });
    this.app.use('/api', router);
  }
}

export default App;