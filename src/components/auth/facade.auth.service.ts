import { AbstractFacadeAuthService } from './abstracts/abstract.facade.auth.service';
import { UpdateCredentialDto } from '../credential/dto/update-credential-by-uuid.dto';
import { AccessAndRefreshTokenInterface } from './interface/access-and-refresh-token.interface';
import { AbstractAuthService } from './abstracts/abstract.auth.service';
import { AbstractCredentialService } from '../credential/abstracts/abstract.credential.service';

export class FacadeAuthService extends AbstractFacadeAuthService {
  constructor(
    private authService: AbstractAuthService,
    private credentialService: AbstractCredentialService,
  ) {
    super();
  }

  public async updateCredentialByUUID(
    updateCredentialDto: UpdateCredentialDto,
  ): Promise<AccessAndRefreshTokenInterface> {
    try {
      const { uuid } = updateCredentialDto;
      const tokenPair: AccessAndRefreshTokenInterface = {
        accessToken: this.authService.createAccessToken({
          tokenType: 'access',
          uuid,
        }),
        refreshToken: this.authService.createRefreshToken({
          tokenType: 'refresh',
          uuid,
        }),
      };
      const updated = await this.credentialService.updateCredentialByUUID({
        uuid,
        refreshToken: tokenPair.refreshToken,
      });
      if (updated) {
        return tokenPair;
      }
      throw new Error();
    } catch (e) {
      throw e;
    }
  }
}
