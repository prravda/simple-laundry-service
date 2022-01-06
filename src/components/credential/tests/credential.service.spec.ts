import { CredentialService } from '../services/credential.service';
import { MockCredentialRepository } from '../repositories/mock.credential.repository';

describe('credential component service test', () => {
  const service = new CredentialService(new MockCredentialRepository());
  it('credential entity 를 잘 생성해냅니다.', () => {
    const mockRefreshToken = 'test.refresh.token';
    const credential = service.createCredential({
      refreshToken: mockRefreshToken,
    });
    expect(credential.refreshToken).toBe(mockRefreshToken);
  });
});
