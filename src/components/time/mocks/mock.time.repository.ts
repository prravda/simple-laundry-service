import { AbstractTimeRepository } from '../abstracts/abstract.time.repository';
import {
  CreateTimeDto,
  FindTimeByTimeId,
  Time,
  UpdateTimeByTimeIdDto,
} from '../../../database/entities/time';
import { DeepPartial } from 'typeorm';

export class MockTimeRepository extends AbstractTimeRepository {
  public async insertTime(createTimeDto: CreateTimeDto): Promise<Time> {
    const { pickup, pickupEnd, delivery, deliveryEnd } = createTimeDto;
    const mockTimeEntity = new Time();
    mockTimeEntity.pickup = pickup;
    mockTimeEntity.pickupEnd = pickupEnd;
    mockTimeEntity.delivery = delivery;
    mockTimeEntity.deliveryEnd = deliveryEnd;
    return Promise.resolve(mockTimeEntity);
  }

  public async findTimeByTimeId(
    findTimeByTimeId: FindTimeByTimeId,
  ): Promise<Time> {
    const mockTimeEntity = new Time();
    const { id } = findTimeByTimeId;
    mockTimeEntity.id = id;
    mockTimeEntity.pickup = new Date('2022-01-01 00:00:01');
    mockTimeEntity.pickupEnd = new Date('2022-01-01 00:02');
    mockTimeEntity.delivery = new Date('2022-01-01 00:03');
    mockTimeEntity.deliveryEnd = new Date('2022-01-01 00:04');
    return Promise.resolve(mockTimeEntity);
  }

  public async updateTimeByTimeId(
    updateTimeDto: UpdateTimeByTimeIdDto,
  ): Promise<Time> {
    const { id, pickup, pickupEnd, delivery, deliveryEnd } = updateTimeDto;
    const mockTimeEntityCreatedWithId = await this.findTimeByTimeId({ id });
    pickup ? (mockTimeEntityCreatedWithId.pickup = pickup) : null;
    pickupEnd ? (mockTimeEntityCreatedWithId.pickupEnd = pickupEnd) : null;
    delivery ? (mockTimeEntityCreatedWithId.delivery = delivery) : null;
    deliveryEnd
      ? (mockTimeEntityCreatedWithId.deliveryEnd = deliveryEnd)
      : null;
    return Promise.resolve(mockTimeEntityCreatedWithId);
  }

  public async saveTime(time: DeepPartial<Time>): Promise<Time> {
    try {
      const { pickup, pickupEnd, delivery, deliveryEnd } = time;
      if (
        pickup instanceof Date &&
        pickupEnd instanceof Date &&
        delivery instanceof Date &&
        deliveryEnd instanceof Date
      ) {
        const mockTimeEntity = new Time();
        mockTimeEntity.pickup = pickup;
        mockTimeEntity.pickupEnd = pickupEnd;
        mockTimeEntity.delivery = delivery;
        mockTimeEntity.deliveryEnd = deliveryEnd;
        return Promise.resolve(mockTimeEntity);
      }
      throw Error('invalid properties');
    } catch (e) {
      throw e;
    }
  }
}
