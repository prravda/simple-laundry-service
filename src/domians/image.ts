export interface CreateImageDto {
  imageId: string;
  imageUrl: string;
}

export class Image {
  get imageUrl(): string {
    return this._imageUrl;
  }
  get imageId(): string {
    return this._imageId;
  }
  private readonly _imageId: string;
  private readonly _imageUrl: string;
  constructor({ imageId, imageUrl }: CreateImageDto) {
    this._imageId = imageId;
    this._imageUrl = imageUrl;
  }
}
