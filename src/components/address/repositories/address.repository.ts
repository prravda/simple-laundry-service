import { AbstractAddressRepository } from '../abstracts/abstract.address.repository';
import { Address, CreateAddressDto } from '../../../database/entities/address';
import { Connection, getRepository, Repository } from 'typeorm';
import { WashswotConnectionManager } from '../../../database/washswot-connection-manager';

export class AddressRepository extends AbstractAddressRepository {
  constructor() {
    super();
  }
  private getRepository(): Repository<Address> {
    return WashswotConnectionManager.getConnection().getRepository(Address);
  }
  public createAddress(createAddressDto: CreateAddressDto): Address {
    return this.getRepository().create(createAddressDto);
  }
}
