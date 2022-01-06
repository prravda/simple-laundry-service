import { AbstractRepository } from 'typeorm';
import { Tag } from '../../../database/entities/tag';

export abstract class AbstractTagRepository extends AbstractRepository<Tag> {}
