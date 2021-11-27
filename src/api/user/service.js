import { v4 as uuidv4 } from 'uuid';

export default class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  findUserByPhone(phone) {
    return this.dao.findUserByPhone(phone);
  }

  findUserByUUID(UUID) {
    return this.dao.findUserByUUID(UUID);
  }

  insertUser(phone) {
    const UUID = uuidv4();
    return this.dao.insertUser(UUID, phone);
  }
}
