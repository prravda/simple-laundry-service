import { TimeService } from '../time.service';
import { MockTimeRepository } from '../mocks/mock.time.repository';

describe('time domain object service logic testing', () => {
  const service = new TimeService(new MockTimeRepository());
  it('time entity 를 생성할 때, pickupEnd 날짜가 pickup 보다 빠른 경우 오류를 반환합니다.', async () => {
    await expect(async () => {
      await service.createTime({
        pickup: new Date('2021-01-01 00:00:01'),
        pickupEnd: new Date('1999-01-01 00:00:00'),
        delivery: new Date('2021-01-01 00:00:02'),
        deliveryEnd: new Date('2021-01-01 00:00:03'),
      });
    }).rejects.toThrowError('invalid time input');
  });

  it('time entity 를 생성할 때, deliveryEnd 날짜가 delivery 보다 빠른 경우 오류를 반환합니다.', async () => {
    await expect(async () => {
      await service.createTime({
        pickup: new Date('2021-01-01 00:00:01'),
        pickupEnd: new Date('2021-01-01 00:00:02'),
        delivery: new Date('2021-01-01 00:00:03'),
        deliveryEnd: new Date('1999-01-01 00:00:00'),
      });
    }).rejects.toThrowError('invalid time input');
  });
});
