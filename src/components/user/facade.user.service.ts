import { AbstractService } from '../../constants/abstracts/abstract.service';
import { AbstractUserService } from './abstracts/abstract.user.service';
import { AbstractCredentialService } from '../credential/abstracts/abstract.credential.service';
import { AbstractAddressService } from '../address/abstracts/abstract.address.service';
import { CreateUserDto } from '../../domians/user';
import { AbstractAuthService } from '../auth/abstracts/abstract.auth.service';

export class FacadeUserService extends AbstractService {
  constructor(
    private userService: AbstractUserService,
    private credentialService: AbstractCredentialService,
    private addressService: AbstractAddressService,
    private authService: AbstractAuthService,
  ) {
    super();
  }

  public insertUser(createUserDto: CreateUserDto) {}
}
