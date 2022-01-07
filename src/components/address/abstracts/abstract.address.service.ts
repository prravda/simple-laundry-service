import { AbstractService } from '../../../constants/abstracts/abstract.service';
import {
  Address,
  CreateAddressDto,
  FindAddressWithIdDto,
} from '../../../database/entities/address';
export abstract class AbstractAddressService extends AbstractService {
  public abstract createAddress(createAddressDto: CreateAddressDto): Address;
  public abstract findAddressWithId(
    findAddressWithIdDto: FindAddressWithIdDto,
  ): Promise<Address>;
}
