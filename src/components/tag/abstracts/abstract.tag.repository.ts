import { AbstractRepository, DeepPartial } from 'typeorm';
import { CreateTagDto, Tag } from '../../../database/entities/tag';

export abstract class AbstractTagRepository extends AbstractRepository<Tag> {
  abstract create(createTagDto: CreateTagDto): Tag;
  abstract save(deepPartialTag: DeepPartial<Tag>): Promise<Tag>;
  abstract createAndSave(createTagDto: CreateTagDto): Promise<Tag>;
}
