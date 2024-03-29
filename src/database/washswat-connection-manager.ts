import { Connection, Repository, getConnection } from 'typeorm';

export class WashswatConnectionManager {
  private static connection: Connection;
  private static repository: Repository<any>;
  private constructor() {}
  public static getConnection() {
    if (!this.connection) {
      this.connection = getConnection();
    }
    return this.connection;
  }
}
