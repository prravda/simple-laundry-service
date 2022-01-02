import { UserGenders } from '../new-user/types/user-genders';
import { isActivatedUser } from '../new-user/types/is-activated.user';

export interface CreateUserDto {
  userUUID: string;
  userName: string;
  userNickName: string;
  userCellPhoneNumber: string;
  userGender: UserGenders;
  userAddressLineOne: string;
  userAddressLineTwo: string;
  isActivatedUser: isActivatedUser;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export class User {
  private userUUID: string;
  private userName: string;
  private userNickName: string;
  private userCellPhoneNumber: string;
  private userGender: UserGenders;
  private userAddressLineOne: string;
  private userAddressLineTwo: string;
  private isActivatedUser: isActivatedUser;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt?: Date;
  constructor({
    userUUID,
    userName,
    userNickName,
    userCellPhoneNumber,
    userGender,
    userAddressLineOne,
    userAddressLineTwo,
    isActivatedUser,
    createdAt,
    updatedAt,
    deletedAt,
  }: CreateUserDto) {
    this.userUUID = userUUID;
    this.userName = userName;
    this.userNickName = userNickName;
    this.userCellPhoneNumber = userCellPhoneNumber;
    this.userGender = userGender;
    this.userAddressLineOne = userAddressLineOne;
    this.userAddressLineTwo = userAddressLineTwo;
    this.isActivatedUser = isActivatedUser;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  public updateNickname(newNickname: string) {
    this.userNickName = newNickname;
    this.updatedAt = new Date();
  }

  public softDeleteUser() {
    this.isActivatedUser = 'false';
    this.deletedAt = new Date();
  }
}
