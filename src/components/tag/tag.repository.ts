import { AbstractTagRepository } from './abstracts/abstract.tag.repository';
import { WashswatConnectionManager } from '../../database/washswat-connection-manager';
import { DeepPartial } from 'typeorm';
import { CreateTagDto, Tag } from '../../database/entities/tag';

export class TagRepository extends AbstractTagRepository {
  constructor() {
    super();
  }
  private getRepository() {
    return WashswatConnectionManager.getConnection().getRepository(Tag);
  }

  create(createTagDto: CreateTagDto): Tag {
    return this.getRepository().create(createTagDto);
  }

  async save(deepPartialTag: DeepPartial<Tag>): Promise<Tag> {
    return await this.getRepository().save(deepPartialTag);
  }

  async createAndSave(createTagDto: CreateTagDto): Promise<Tag> {
    const entity = this.create(createTagDto);
    return await this.save(entity);
  }
}
