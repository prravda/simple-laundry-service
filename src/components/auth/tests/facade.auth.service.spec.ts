import { FacadeAuthService } from '../facade.auth.service';
import { AuthService } from '../services/auth.service';
import { CredentialService } from '../../credential/services/credential.service';
import { MockCredentialRepository } from '../../credential/repositories/mock.credential.repository';
import cuid from 'cuid';

describe('facade auth service logic test', () => {
  const authServiceToValidate = new AuthService();
  const facadeAuthService = new FacadeAuthService(
    authServiceToValidate,
    new CredentialService(new MockCredentialRepository()),
  );

  it(`사용자가 Authorization header 에 valid 한 refresh token 을 실어 보내면,
            갱신된 access token 과 refresh token pair 를 반환합니다. 
  `, async () => {
    const mockUUID = cuid();
    const result = await facadeAuthService.updateCredentialByUUID({
      uuid: mockUUID,
    });
    expect(result).toHaveProperty('accessToken');
    expect(result).toHaveProperty('refreshToken');
  });
});
