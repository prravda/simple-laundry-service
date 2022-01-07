import { AbstractImageService } from './abstracts/abstract.image.service';
import { CreateImageDto, Image } from '../../database/entities/image';
import { AbstractImageRepository } from './abstracts/abstract.image.repository';
import { DeepPartial } from 'typeorm';

export class ImageService extends AbstractImageService {
  constructor(private readonly imageRepository: AbstractImageRepository) {
    super();
  }

  create(createImageDto: CreateImageDto): Image {
    return this.imageRepository.create(createImageDto);
  }

  async createAndSave(createImageDto: CreateImageDto): Promise<Image> {
    return await this.imageRepository.createAndSave(createImageDto);
  }

  async save(deepPartialImage: DeepPartial<Image>): Promise<Image> {
    return await this.imageRepository.save(deepPartialImage);
  }

  async saveMany(images: Image[]): Promise<Image[]> {
    return await this.imageRepository.saveMany(images);
  }
}
