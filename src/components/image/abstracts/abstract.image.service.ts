import { AbstractService } from '../../../constants/abstracts/abstract.service';
import { DeepPartial } from 'typeorm';
import { CreateImageDto, Image } from '../../../database/entities/image';

export abstract class AbstractImageService extends AbstractService {
  abstract create(createImageDto: CreateImageDto): Image;
  abstract save(deepPartialImage: DeepPartial<Image>): Promise<Image>;
  abstract saveMany(deepPartialImage: Image[]): Promise<Image[]>;
  abstract createAndSave(createImageDto: CreateImageDto): Promise<Image>;
}
