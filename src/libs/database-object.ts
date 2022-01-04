import Database from 'better-sqlite3';
import { createTableQueries } from './create-tables-queries';
import { getConfig } from '../config';

export class DatabaseObject {
  private static database: Database.Database;
  private constructor() {}
  public static getDatabase() {
    if (!this.database) {
      this.database = new Database(getConfig().databaseName);
      this.database.exec(createTableQueries);
    }
    return this.database;
  }
}
