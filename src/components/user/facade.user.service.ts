import { AbstractService } from '../../constants/abstracts/abstract.service';
import { AbstractUserService } from './abstracts/abstract.user.service';
import { AbstractCredentialService } from '../credential/abstracts/abstract.credential.service';
import { AbstractAddressService } from '../address/abstracts/abstract.address.service';
import { CreateUserDto } from '../../database/entities/user';
import { AbstractAuthService } from '../auth/abstracts/abstract.auth.service';
import { CreateAddressDto } from '../../database/entities/address';

export class FacadeUserService extends AbstractService {
  constructor(
    private readonly userService: AbstractUserService,
    private readonly credentialService: AbstractCredentialService,
    private readonly addressService: AbstractAddressService,
    private readonly authService: AbstractAuthService,
  ) {
    super();
  }

  public async insertUser(
    createUserDtoWithAddressInformation: CreateUserDto & CreateAddressDto,
  ): Promise<string> {
    const { addressLineOne, addressLineTwo, ...createUserDto } =
      createUserDtoWithAddressInformation;
    const user = this.userService.createUser(createUserDto);
    // address 추가
    user.addresses.push(
      this.addressService.createAddress({
        addressLineOne,
        addressLineTwo,
      }),
    );
    // access token 생성
    const accessToken = this.authService.createToken({
      userUUID: user.uuid,
      tokenType: 'access',
    });
    // refresh token 생성
    const refreshToken = this.authService.createToken({
      userUUID: user.uuid,
      tokenType: 'refresh',
    });
    // credential 추가
    user.credential = this.credentialService.createCredential({
      refreshToken,
    });

    const savedResult = await this.userService.saveUser(user);
    const { name, ...anotherInformation } = savedResult;

    return name;
  }
}
