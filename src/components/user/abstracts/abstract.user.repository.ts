import { User } from '../../../domians/user';

export abstract class AbstractUserRepository {
  public abstract insertUser(): User;
  public abstract findUserByUUID(): User | null;
  public abstract findUserByCellPhoneNumber(): User;
  public abstract softDeleteUser(): void;
}
