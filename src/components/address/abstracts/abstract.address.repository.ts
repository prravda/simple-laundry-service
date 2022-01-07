import { AbstractRepository } from 'typeorm';
import {
  Address,
  CreateAddressDto,
  FindAddressWithIdDto,
} from '../../../database/entities/address';

export abstract class AbstractAddressRepository extends AbstractRepository<Address> {
  public abstract createAddress(createAddressDto: CreateAddressDto): Address;
  public abstract findAddressById(
    findAddressWithIdDto: FindAddressWithIdDto,
  ): Promise<Address>;
}
