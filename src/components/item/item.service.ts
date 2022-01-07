import { AbstractItemService } from './abstracts/abstract.item.service';
import { CreateItemDto, Item } from '../../database/entities/item';
import { DeepPartial } from 'typeorm';
import { AbstractItemRepository } from './abstracts/abstract.item.repository';

export class ItemService extends AbstractItemService {
  constructor(private readonly itemRepository: AbstractItemRepository) {
    super();
  }

  create(createItemDto: CreateItemDto): Item {
    return this.itemRepository.create(createItemDto);
  }

  async createAndSave(createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemRepository.createAndSave(createItemDto);
  }

  async save(deepPartialItem: DeepPartial<Item>): Promise<Item> {
    return await this.itemRepository.save(deepPartialItem);
  }

  async saveMany(items: Item[]): Promise<Item[]> {
    return this.itemRepository.saveMany(items);
  }
}
