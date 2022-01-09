import { AbstractItemRepository } from './abstracts/abstract.item.repository';
import { CreateItemDto, Item } from '../../database/entities/item';
import { DeepPartial } from 'typeorm';
import { WashswatConnectionManager } from '../../database/washswat-connection-manager';

export class ItemRepository extends AbstractItemRepository {
  constructor() {
    super();
  }

  private getRepository() {
    return WashswatConnectionManager.getConnection().getRepository(Item);
  }

  create(createItemDto: CreateItemDto): Item {
    return this.getRepository().create(createItemDto);
  }

  async createAndSave(createItemDto: CreateItemDto): Promise<Item> {
    const entity = this.create(createItemDto);
    return await this.save(entity);
  }

  async save(deepPartialItem: DeepPartial<Item>): Promise<Item> {
    return this.getRepository().save(deepPartialItem);
  }

  async saveMany(items: Item[]): Promise<Item[]> {
    return this.getRepository().save(items);
  }
}
