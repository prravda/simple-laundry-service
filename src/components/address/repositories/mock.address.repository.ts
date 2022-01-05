import { AbstractAddressRepository } from '../abstracts/abstract.address.repository';
import { Address, CreateAddressDto } from '../../../database/entities/address';
import { getRepository } from 'typeorm';

export class MockAddressRepository extends AbstractAddressRepository {
  constructor() {
    super();
  }
  createAddress(createAddressDto: CreateAddressDto): Address {
    const mockAddress = new Address();
    mockAddress.addressLineOne = createAddressDto.addressLineOne;
    mockAddress.addressLineTwo = createAddressDto.addressLineTwo;
    return mockAddress;
  }
}
