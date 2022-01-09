import { AbstractAddressRepository } from '../abstracts/abstract.address.repository';
import {
  Address,
  CreateAddressDto,
  FindAddressWithIdDto,
} from '../../../database/entities/address';
import { Repository } from 'typeorm';
import { WashswatConnectionManager } from '../../../database/washswat-connection-manager';

export class AddressRepository extends AbstractAddressRepository {
  constructor() {
    super();
  }
  private getRepository(): Repository<Address> {
    try {
      return WashswatConnectionManager.getConnection().getRepository(Address);
    } catch (e) {
      throw e;
    }
  }
  public createAddress(createAddressDto: CreateAddressDto): Address {
    try {
      return this.getRepository().create(createAddressDto);
    } catch (e) {
      throw e;
    }
  }

  public async findAddressById(
    findAddressWithIdDto: FindAddressWithIdDto,
  ): Promise<Address> {
    try {
      const { id } = findAddressWithIdDto;
      const result = await this.getRepository().findOne({ id });
      if (result) {
        return result;
      }
      throw new Error('cannot find address with this id');
    } catch (e) {
      throw e;
    }
  }
}
