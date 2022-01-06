import { FacadeUserService } from '../facade.user.service';
import { UserService } from '../services/user.service';
import { MockUserRepository } from '../repositories/mock.user.repository';
import { CredentialService } from '../../credential/services/credential.service';
import { MockCredentialRepository } from '../../credential/repositories/mock.credential.repository';
import { AddressService } from '../../address/address.service';
import { MockAddressRepository } from '../../address/repositories/mock.address.repository';
import { AuthService } from '../../auth/services/auth.service';
import { CreateUserDto } from '../../../database/entities/user';
import { CreateAddressDto } from '../../../database/entities/address';
import { getConfig } from '../../../config';

describe('user component 의 facade user service testing', () => {
  const authServiceForValidateToken = new AuthService();
  const facadeUserService = new FacadeUserService(
    new UserService(new MockUserRepository()),
    new CredentialService(new MockCredentialRepository()),
    new AddressService(new MockAddressRepository()),
    authServiceForValidateToken,
  );

  it('사용자의 이름, 닉네임, 전화번호, 성별, 주소1, 주소2 를 통해 사용자를 생성하면, { accessToken: string, refreshToken: string } 구조의 AccessAndRefreshTokenInterface type 의 결과값을 반환합니다.', async () => {
    const createMockUserDtoWithAddressInformation: CreateUserDto &
      CreateAddressDto = {
      name: 'test-name',
      nickname: 'test-nickname',
      cellPhoneNumber: '010-3333-3333',
      gender: 'male',
      addressLineOne: 'test-address-line-one',
      addressLineTwo: 'test-address-line-two',
    };
    const result = await facadeUserService.insertUser(
      createMockUserDtoWithAddressInformation,
    );
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });

  it('사용자 회원 가입에 성공했을 때, 발행되는 token 들은 decode 가 가능합니다.', async () => {
    const createMockUserDtoWithAddressInformation: CreateUserDto &
      CreateAddressDto = {
      name: 'test-name',
      nickname: 'test-nickname',
      cellPhoneNumber: '010-3333-3333',
      gender: 'male',
      addressLineOne: 'test-address-line-one',
      addressLineTwo: 'test-address-line-two',
    };
    const { accessToken, refreshToken } = await facadeUserService.insertUser(
      createMockUserDtoWithAddressInformation,
    );
    const verifyResultOfAccessToken = authServiceForValidateToken.verifyToken({
      token: accessToken,
    });
    expect(verifyResultOfAccessToken).toHaveProperty('uuid');
    expect(verifyResultOfAccessToken).toHaveProperty('iat');
    expect(verifyResultOfAccessToken).toHaveProperty('exp');
    expect(verifyResultOfAccessToken).toHaveProperty('aud');
    expect(verifyResultOfAccessToken).toHaveProperty('iss');

    const verifyResultOfRefreshToken = authServiceForValidateToken.verifyToken({
      token: refreshToken,
    });
    expect(verifyResultOfRefreshToken).toHaveProperty('uuid');
    expect(verifyResultOfRefreshToken).toHaveProperty('iat');
    expect(verifyResultOfRefreshToken).toHaveProperty('exp');
    expect(verifyResultOfRefreshToken).toHaveProperty('aud');
    expect(verifyResultOfRefreshToken).toHaveProperty('iss');
  });

  it('사용자 회원 가입에 성공했을 때, 발행되는 token 에 기입한 audience 와 issuer 정보는, 환경변수를 통해 기입한 정보와 같습니다.', async () => {
    const createMockUserDtoWithAddressInformation: CreateUserDto &
      CreateAddressDto = {
      name: 'test-name',
      nickname: 'test-nickname',
      cellPhoneNumber: '010-3333-3333',
      gender: 'male',
      addressLineOne: 'test-address-line-one',
      addressLineTwo: 'test-address-line-two',
    };
    const { accessToken, refreshToken } = await facadeUserService.insertUser(
      createMockUserDtoWithAddressInformation,
    );
    const verifyResultOfAccessToken = authServiceForValidateToken.verifyToken({
      token: accessToken,
    });
    expect(verifyResultOfAccessToken.aud).toEqual(getConfig().jwtAudience);
    expect(verifyResultOfAccessToken.iss).toEqual(getConfig().jwtIssuer);
    const verifyResultOfRefreshToken = authServiceForValidateToken.verifyToken({
      token: refreshToken,
    });
    expect(verifyResultOfRefreshToken.aud).toEqual(getConfig().jwtAudience);
    expect(verifyResultOfRefreshToken.iss).toEqual(getConfig().jwtIssuer);
  });
});
