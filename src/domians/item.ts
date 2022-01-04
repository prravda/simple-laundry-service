import { Image } from './image';

export interface CreateItemDto {
  name: string;
  userMessage: string;
  tagList: string[];
  representativeItemImage: string;
  imageList: Image[];
}

export class Item {
  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get userMessage(): string {
    return this._userMessage;
  }

  set userMessage(value: string) {
    this._userMessage = value;
  }

  get tagList(): string[] {
    return this._tagList;
  }

  get representativeItemImage(): string {
    return this._representativeItemImage;
  }

  set representativeItemImage(value: string) {
    this._representativeItemImage = value;
  }

  get imageList(): Image[] {
    return this._imageList;
  }

  private _name: string;
  private _userMessage: string;
  private readonly _tagList: string[];
  private _representativeItemImage: string;
  private readonly _imageList: Image[];
  constructor({
    name,
    userMessage,
    tagList,
    representativeItemImage,
    imageList,
  }: CreateItemDto) {
    this._name = name;
    this._userMessage = userMessage;
    this._tagList = tagList;
    this._representativeItemImage = representativeItemImage;
    this._imageList = imageList;
  }

  private findImageIndexByImageId(imageIdToFind: string) {
    return this.imageList.findIndex((image) => image.imageId === imageIdToFind);
  }

  public insertImagesToImageList(images: Image[]) {
    this.imageList.push(...images);
  }

  public deleteImageByImageId(imageIdToDelete: string) {
    delete this.imageList[this.findImageIndexByImageId(imageIdToDelete)];
  }

  private findTagIndexByTagName(tagNameToFind: string) {
    return this.tagList.findIndex((tag) => tag === tagNameToFind);
  }

  public insertTagsToTagList(tags: string[]) {
    this.tagList.push(...tags);
  }

  public deleteTagByTagName(tagName: string) {
    delete this.tagList[this.findTagIndexByTagName(tagName)];
  }

  public updateUserMessage(newUserMessage: string) {
    this.userMessage = newUserMessage;
  }

  public updateName(newName: string) {
    this.name = newName;
  }

  public updateRepresentativeItemImageByImageId(imageIdoChoose: string) {
    const indexOfImageToChoose = this.findImageIndexByImageId(imageIdoChoose);
    this.representativeItemImage =
      this.imageList[indexOfImageToChoose].imageUrl;
  }
}
