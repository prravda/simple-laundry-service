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
  ]);
  app.listen();
}

start();
