import { App } from './app';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/user.service';
import { UserController } from './components/user/user.controller';
import { TypeOrmConnection } from './database/typeorm-connection';

async function start() {
  await TypeOrmConnection.getConnection();
  const app = new App([
    new UserComponent(new UserController(new UserService())),
  ]);
  app.listen();
}

start();
