import { App } from './app';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/services/user.service';
import { UserController } from './components/user/user.controller';
import { TypeOrmConnection } from './database/typeorm-connection';
import { FacadeUserService } from './components/user/facade.user.service';
import { CredentialService } from './components/credential/services/credential.service';
import { AddressService } from './components/address/address.service';
import { AuthService } from './components/auth/services/auth.service';
import { UserRepository } from './components/user/repositories/user.repository';
import { CredentialRepository } from './components/credential/repositories/credential.repository';
import { AddressRepository } from './components/address/repositories/address.repository';
import { AuthComponent } from './components/auth/auth.component';
import { AuthController } from './components/auth/auth.controller';
import { FacadeAuthService } from './components/auth/facade.auth.service';
import { TaskComponent } from './components/task/task.component';
import { TaskController } from './components/task/task.controller';
import { FacadeTaskService } from './components/task/facade.task.service';
import { ImageService } from './components/image/image.service';
import { ImageRepository } from './components/image/image.repository';
import { InformationService } from './components/information/information.service';
import { InformationRepository } from './components/information/information.repository';
import { TimeService } from './components/time/time.service';
import { TimeRepository } from './components/time/time.repository';
import { ItemRepository } from './components/item/item.repository';
import { MissionService } from './components/mission/mission.service';
import { MissionRepository } from './components/mission/mission.repository';
import { TagService } from './components/tag/tag.service';
import { TagRepository } from './components/tag/tag.repository';
import { ItemService } from './components/item/item.service';
import { TaskService } from './components/task/task.service';
import { TaskRepository } from './components/task/task.repository';

async function start() {
  await TypeOrmConnection.getConnection();
  const app = new App([
    new UserComponent(
      new UserController(
        new FacadeUserService(
          new UserService(new UserRepository()),
          new CredentialService(new CredentialRepository()),
          new AddressService(new AddressRepository()),
          new AuthService(),
        ),
      ),
    ),
    new AuthComponent(
      new AuthController(
        new FacadeAuthService(
          new AuthService(),
          new CredentialService(new CredentialRepository()),
        ),
      ),
    ),
    new TaskComponent(
      new TaskController(
        new FacadeTaskService(
          new UserService(new UserRepository()),
          new ImageService(new ImageRepository()),
          new AddressService(new AddressRepository()),
          new InformationService(new InformationRepository()),
          new TimeService(new TimeRepository()),
          new ItemService(new ItemRepository()),
          new MissionService(new MissionRepository()),
          new TagService(new TagRepository()),
          new TaskService(new TaskRepository()),
        ),
      ),
    ),
  ]);
  app.listen();
}

start();
