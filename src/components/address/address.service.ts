import { AbstractAddressService } from './abstracts/abstract.address.service';
import { CreateAddressDto } from '../../domians/address';
import { DatabaseObject } from '../../libs/database-object';

export class AddressService extends AbstractAddressService {
  private connection: any;
  constructor() {
    super();
    this.connection = DatabaseObject.getDatabase();
  }
  public createAddress(createAddressDto: CreateAddressDto): void {
    const { addressLineOne, addressLineTwo } = createAddressDto;
    const insert = this.connection.prepare(
      `INSERT INTO address (address_line_one, address_line_two) VALUES (?, ?)`,
    );
    insert.run(addressLineOne, addressLineTwo);
  }
}
