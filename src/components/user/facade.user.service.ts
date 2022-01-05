import { AbstractService } from '../../constants/abstracts/abstract.service';
import { AbstractUserService } from './abstracts/abstract.user.service';
import { AbstractCredentialService } from '../credential/abstracts/abstract.credential.service';
import { AbstractAddressService } from '../address/abstracts/abstract.address.service';
import { CreateUserDto } from '../../domians/user';
import { AbstractAuthService } from '../auth/abstracts/abstract.auth.service';
import { CreateAddressDto } from '../../domians/address';
import { CreateCredentialDto } from '../../domians/credential';
import { TokenType } from '../auth/types/token-type';
import { AbstractToken } from '../auth/abstracts/abstract.token';
import { CreateTokenDto } from '../auth/dto/create-token.dto';

export class FacadeUserService extends AbstractService {
  constructor(
    private userService: AbstractUserService,
    private credentialService: AbstractCredentialService,
    private addressService: AbstractAddressService,
    private authService: AbstractAuthService,
  ) {
    super();
  }

  private createToken(createTokenDto: CreateTokenDto): string {
    return this.authService.createToken(createTokenDto);
  }

  private createAddress(createAddressDto: CreateAddressDto) {
    return this.addressService.createAddress(createAddressDto);
  }

  private createCredential(createCredentialDto: CreateCredentialDto) {
    return this.credentialService.createCredential(createCredentialDto);
  }

  public insertUser(createUserDto: CreateUserDto) {
    const { userUUID, userAddressLineOne, userAddressLineTwo } = createUserDto;
    const accessToken = this.createToken({ userUUID, tokenType: 'access' });
    const refreshToken = this.createToken({ userUUID, tokenType: 'refresh' });
    const address = this.createAddress({
      addressLineOne: userAddressLineOne,
      addressLineTwo: userAddressLineTwo,
    });
  }
}
