import { Address } from '../../database/entities/address';

const mockAddress = new Address();
mockAddress.id = 1;
mockAddress.addressLineOne = 'mock address line 1';
mockAddress.addressLineTwo = 'mock address line 2';

export default mockAddress;
