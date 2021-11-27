import { database } from '../../libs/database';
export default class Dao {
  tableName = 'Tb_User';
  constructor () {
    try {
      let result = database.prepare(`SELECT * FROM ${this.tableName}`).all();
    } catch (e) {
      /** 테이블 존재하지 않음 **/
      this.createTable();
    }
  }
  createTable = () => {
  }
}
