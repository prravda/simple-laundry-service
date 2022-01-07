import { WashswotConnectionManager } from '../../database/washswot-connection-manager';
import { AbstractImageRepository } from './abstracts/abstract.image.repository';
import { CreateImageDto, Image } from '../../database/entities/image';
import { DeepPartial } from 'typeorm';
export class ImageRepository extends AbstractImageRepository {
  constructor() {
    super();
  }
  private getRepository() {
    return WashswotConnectionManager.getConnection().getRepository(Image);
  }

  create(createImageDto: CreateImageDto): Image {
    return this.getRepository().create(createImageDto);
  }

  async createAndSave(createImageDto: CreateImageDto): Promise<Image> {
    const entity = this.create(createImageDto);
    return await this.save(entity);
  }

  async save(deepPartialImage: DeepPartial<Image>): Promise<Image> {
    return await this.getRepository().save(deepPartialImage);
  }

  async saveMany(images: Image[]): Promise<Image[]> {
    return await this.getRepository().save<Image>(images);
  }
}
