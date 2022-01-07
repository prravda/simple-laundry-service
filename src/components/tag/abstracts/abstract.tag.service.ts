import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { DeepPartial } from 'typeorm';
import { CreateTagDto, Tag } from '../../../database/entities/tag';

export abstract class AbstractTagService extends AbstractService {
  abstract create(createTagDto: CreateTagDto): Tag;
  abstract save(deepPartialTag: DeepPartial<Tag>): Promise<Tag>;
  abstract createAndSave(createTagDto: CreateTagDto): Promise<Tag>;
}
