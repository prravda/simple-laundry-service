import { AuthService } from '../auth.service';
import cuid from 'cuid';
import { TokenType } from '../types/token-type';
import { getConfig } from '../../../config';

describe('address component service test', () => {
  const service = new AuthService();
  it('access, refresh 가 아닌 token type 을 입력 시 오류를 반환합니다.', () => {
    expect(() =>
      service.createToken({
        userUUID: cuid(),
        tokenType: 'invalid-token' as TokenType,
      }),
    ).toThrowError('error: invalid token creation');
  });

  it('access token 을 잘 생성합니다.', () => {
    const uuid = cuid();
    const accessToken = service.createToken({
      userUUID: uuid,
      tokenType: 'access',
    });
    const tokenInformation = service.verifyToken({ token: accessToken });
    const { iss, aud, userUUID } = tokenInformation;
    expect({ iss, aud, userUUID }).toStrictEqual({
      iss: getConfig().jwtIssuer,
      aud: getConfig().jwtAudience,
      userUUID: uuid,
    });
  });

  it('refresh token 을 잘 생성합니다.', () => {
    const uuid = cuid();
    const refreshToken = service.createToken({
      userUUID: uuid,
      tokenType: 'access',
    });
    const tokenInformation = service.verifyToken({ token: refreshToken });
    const { iss, aud, userUUID } = tokenInformation;
    expect({ iss, aud, userUUID }).toStrictEqual({
      iss: getConfig().jwtIssuer,
      aud: getConfig().jwtAudience,
      userUUID: uuid,
    });
  });
});
