import { Item } from './item';

export interface CreateMissionDto {
  itemList: Item[];
}

export class Mission {
  get itemList(): Item[] {
    return this._itemList;
  }

  private readonly _itemList: Item[];
  constructor({ itemList }: CreateMissionDto) {
    this._itemList = itemList;
  }
}
