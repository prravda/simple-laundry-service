import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { Address, CreateAddressDto } from '../../../domians/address';
export abstract class AbstractAddressService extends AbstractService {
  public abstract createAddress(createAddressDto: CreateAddressDto): Address;
}
