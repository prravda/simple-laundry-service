import { App } from './app';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/user.service';
import { UserController } from './components/user/user.controller';
import { DatabaseObject } from './libs/database-object';

async function start() {
  DatabaseObject.getDatabase();
  const app = new App([
    new UserComponent(new UserController(new UserService())),
  ]);
  app.listen();
}

start();
