import { AbstractRepository } from 'typeorm';
import { Item } from '../../../database/entities/item';

export abstract class AbstractItemRepository extends AbstractRepository<Item> {}
