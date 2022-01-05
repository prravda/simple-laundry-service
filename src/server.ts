import { App } from './app';
import { UserComponent } from './components/user/user.component';
import { UserService } from './components/user/services/user.service';
import { UserController } from './components/user/user.controller';
import { TypeOrmConnection } from './database/typeorm-connection';
import { FacadeUserService } from './components/user/facade.user.service';
import { CredentialService } from './components/credential/credential.service';
import { AddressService } from './components/address/address.service';
import { AuthService } from './components/auth/auth.service';
import { UserRepository } from './components/user/repositories/user.repository';
import { CredentialRepository } from './components/credential/repositories/credential.repository';
import { AddressRepository } from './components/address/repositories/address.repository';

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
  ]);
  app.listen();
}

start();
