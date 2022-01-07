import { AbstractTagService } from './abstracts/abstract.tag.service';
import { DeepPartial } from 'typeorm';
import { AbstractTagRepository } from './abstracts/abstract.tag.repository';
import { CreateTagDto, Tag } from '../../database/entities/tag';

export class TagService extends AbstractTagService {
  constructor(private readonly tagRepository: AbstractTagRepository) {
    super();
  }

  create(createTagDto: CreateTagDto): Tag {
    return this.tagRepository.create(createTagDto);
  }

  async save(deepPartialTag: DeepPartial<Tag>): Promise<Tag> {
    return await this.tagRepository.save(deepPartialTag);
  }

  async createAndSave(createTagDto: CreateTagDto): Promise<Tag> {
    return await this.tagRepository.createAndSave(createTagDto);
  }
}
