import { AbstractRepository } from 'typeorm';
import { Image } from '../../../database/entities/image';

export abstract class AbstractImageRepository extends AbstractRepository<Image> {}
