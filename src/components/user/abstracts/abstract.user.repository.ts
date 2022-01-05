import { User } from '../../../database/entities/user';

export abstract class AbstractUserRepository {
  public abstract insertUser(user: User): User;
  // public abstract findUserByUUID(): User | null;
  // public abstract findUserByCellPhoneNumber(): User;
  // public abstract softDeleteUser(): void;
}
