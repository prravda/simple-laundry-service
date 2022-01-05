import { AddressService } from '../address.service';
import { MockAddressRepository } from '../repositories/mock.address.repository';

describe('Address service test', () => {
  const addressService = new AddressService(new MockAddressRepository());
  it('address entity object 를 잘 생성합니다.', () => {
    const address = addressService.createAddress({
      addressLineOne: '테스트 주소 1',
      addressLineTwo: '테스트 주소 2',
    });
    expect(address.addressLineOne).toBe('테스트 주소 1');
  });
});
