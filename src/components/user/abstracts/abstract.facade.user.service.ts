import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { CreateUserDto, User } from '../../../database/entities/user';
import { FindUserByUuidDto } from '../dto/find-user-by-uuid.dto';
import { AccessAndRefreshTokenInterface } from '../../auth/interface/access-and-refresh-token.interface';

export abstract class AbstractFacadeUserService extends AbstractService {
  abstract insertUser(
    createUserDto: CreateUserDto,
  ): Promise<AccessAndRefreshTokenInterface>;
  abstract findUserByUUID(findUserByUuidDto: FindUserByUuidDto): Promise<User>;
}
