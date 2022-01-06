import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { UpdateCredentialDto } from '../../credential/dto/update-credential-by-uuid.dto';
import { AccessAndRefreshTokenInterface } from '../interface/access-and-refresh-token.interface';

export abstract class AbstractFacadeAuthService extends AbstractService {
  abstract updateCredentialByUUID(
    updateCredentialDto: UpdateCredentialDto,
  ): Promise<AccessAndRefreshTokenInterface>;
}
