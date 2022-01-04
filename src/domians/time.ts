export interface CreateTimeDto {
  pickup: Date;
  delivery: Date;
}

export class Time {
  private pickup: Date;
  private delivery: Date;
  constructor({ pickup, delivery }: CreateTimeDto) {
    this.pickup = pickup;
    this.delivery = delivery;
  }
}
