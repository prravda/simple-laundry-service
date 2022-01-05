import { AuthService } from '../auth.service';
import cuid from 'cuid';
import { TokenType } from '../types/token-type';
import { getConfig } from '../../../config';

describe('address component service test', () => {
  const service = new AuthService();
  it('access, refresh 가 아닌 token type 을 입력 시 오류를 반환합니다.', () => {
    expect(() =>
      service.createToken({
        uuid: cuid(),
        tokenType: 'invalid-token' as TokenType,
      }),
    ).toThrowError('error: invalid token creation');
  });

  it('access token 을 잘 생성합니다.', () => {
    const mockUUID = cuid();
    const accessToken = service.createToken({
      uuid: mockUUID,
      tokenType: 'access',
    });
    const tokenInformation = service.verifyToken({ token: accessToken });
    const { iss, aud, uuid } = tokenInformation;
    expect({ iss, aud, uuid }).toStrictEqual({
      iss: getConfig().jwtIssuer,
      aud: getConfig().jwtAudience,
      uuid: uuid,
    });
  });

  it('refresh token 을 잘 생성합니다.', () => {
    const mockUUID = cuid();
    const refreshToken = service.createToken({
      uuid: mockUUID,
      tokenType: 'access',
    });
    const tokenInformation = service.verifyToken({ token: refreshToken });
    const { iss, aud, uuid } = tokenInformation;
    expect({ iss, aud, uuid }).toStrictEqual({
      iss: getConfig().jwtIssuer,
      aud: getConfig().jwtAudience,
      uuid: uuid,
    });
  });
});
