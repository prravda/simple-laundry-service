import { AbstractRepository, DeepPartial } from 'typeorm';
import { CreateItemDto, Item } from '../../../database/entities/item';

export abstract class AbstractItemRepository extends AbstractRepository<Item> {
  abstract create(createItemDto: CreateItemDto): Item;
  abstract save(deepPartialItem: DeepPartial<Item>): Promise<Item>;
  abstract saveMany(items: Item[]): Promise<Item[]>;
  abstract createAndSave(createItemDto: CreateItemDto): Promise<Item>;
}
