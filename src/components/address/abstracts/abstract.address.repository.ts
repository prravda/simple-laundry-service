import { AbstractRepository } from 'typeorm';
import { Address, CreateAddressDto } from '../../../database/entities/address';

export abstract class AbstractAddressRepository extends AbstractRepository<Address> {
  public abstract createAddress(createAddressDto: CreateAddressDto): Address;
}
