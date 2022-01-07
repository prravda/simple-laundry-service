import { AbstractAddressRepository } from '../abstracts/abstract.address.repository';
import {
  Address,
  CreateAddressDto,
  FindAddressWithIdDto,
} from '../../../database/entities/address';

export class MockAddressRepository extends AbstractAddressRepository {
  constructor() {
    super();
  }

  findAddressById(
    findAddressWithIdDto: FindAddressWithIdDto,
  ): Promise<Address> {
    const { id } = findAddressWithIdDto;
    const mockAddress = new Address();
    mockAddress.id = id;
    return Promise.resolve(mockAddress);
  }
  createAddress(createAddressDto: CreateAddressDto): Address {
    const mockAddress = new Address();
    mockAddress.addressLineOne = createAddressDto.addressLineOne;
    mockAddress.addressLineTwo = createAddressDto.addressLineTwo;
    return mockAddress;
  }
}
