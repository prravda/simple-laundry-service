import { AbstractAddressService } from './abstracts/abstract.address.service';
import {
  Address,
  CreateAddressDto,
  FindAddressWithIdDto,
} from '../../database/entities/address';
import { AbstractAddressRepository } from './abstracts/abstract.address.repository';

export class AddressService extends AbstractAddressService {
  constructor(private addressRepository: AbstractAddressRepository) {
    super();
  }

  public createAddress(createAddressDto: CreateAddressDto): Address {
    return this.addressRepository.createAddress(createAddressDto);
  }

  async findAddressWithId(
    findAddressWithIdDto: FindAddressWithIdDto,
  ): Promise<Address> {
    return await this.addressRepository.findAddressById(findAddressWithIdDto);
  }
}
