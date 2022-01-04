export interface CreateAddressDto {
  addressLineOne: string;
  addressLineTwo: string;
}

export class Address {
  private addressLineOne: string;
  private addressLineTwo: string;
  constructor({ addressLineOne, addressLineTwo }: CreateAddressDto) {
    this.addressLineOne = addressLineOne;
    this.addressLineTwo = addressLineTwo;
  }
}
