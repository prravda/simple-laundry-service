import { Time } from './time';

export interface CreateInformationDto {
  time: Time;
  address_01: string;
  address_02: string;
  location: string;
}

export class Information {
  get time(): Time {
    return this._time;
  }

  set time(value: Time) {
    this._time = value;
  }

  get address_01(): string {
    return this._address_01;
  }

  set address_01(value: string) {
    this._address_01 = value;
  }

  get address_02(): string {
    return this._address_02;
  }

  set address_02(value: string) {
    this._address_02 = value;
  }

  get location(): string {
    return this._location;
  }

  set location(value: string) {
    this._location = value;
  }

  private _time: Time;
  private _address_01: string;
  private _address_02: string;
  private _location: string;
  constructor({
    time,
    address_01,
    address_02,
    location,
  }: CreateInformationDto) {
    this._time = time;
    this._address_01 = address_01;
    this._address_02 = address_02;
    this._location = location;
  }
}
