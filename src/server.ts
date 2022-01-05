import { App } from './app';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/services/user.service';
import { UserController } from './components/user/user.controller';
import { TypeOrmConnection } from './database/typeorm-connection';
import { getRepository } from 'typeorm';
import { User } from './database/entities/user';

async function start() {
  await TypeOrmConnection.getConnection();
  const app = new App([
    new UserComponent(new UserController(new UserService(getRepository(User)))),
  ]);
  app.listen();
}

start();
