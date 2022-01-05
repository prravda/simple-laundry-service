import { AbstractService } from '../../constants/abstracts/abstract.service';
import { AbstractUserService } from './abstracts/abstract.user.service';
import { AbstractCredentialService } from '../credential/abstracts/abstract.credential.service';
import { AbstractAddressService } from '../address/abstracts/abstract.address.service';
import { CreateUserDto } from '../../database/entities/user';
import { AbstractAuthService } from '../auth/abstracts/abstract.auth.service';
import { CreateAddressDto } from '../../database/entities/address';
import { AbstractFacadeUserService } from './abstracts/abstract.facade.user.service';
import { FindUserByUuidDto } from './dto/find-user-by-uuid.dto';

export class FacadeUserService extends AbstractFacadeUserService {
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
    // add address entity
    user.addresses = [
      this.addressService.createAddress({
        addressLineOne,
        addressLineTwo,
      }),
    ];
    // create access token
    const accessToken = this.authService.createToken({
      uuid: user.uuid,
      tokenType: 'access',
    });
    // create refresh token
    const refreshToken = this.authService.createToken({
      uuid: user.uuid,
      tokenType: 'refresh',
    });
    // add credential entity
    user.credential = this.credentialService.createCredential({
      refreshToken,
    });
    // save user and user-related entites
    await this.userService.saveUser(user);
    // return access token as a result of successful signup
    return accessToken;
  }

  public async findUserByUUID(findUserByUuidDto: FindUserByUuidDto) {
    const { uuid } = findUserByUuidDto;
    return await this.userService.findUserByUUID({ uuid });
  }
}
