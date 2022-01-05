import { getConfig } from '../config';
import { Connection, createConnection } from 'typeorm';
import { Address } from './entities/address';
import { Credential } from './entities/credential';
import { Image } from './entities/image';
import { Information } from './entities/information';
import { Item } from './entities/item';
import { Mission } from './entities/mission';
import { Task } from './entities/task';
import { Time } from './entities/time';
import { User } from './entities/user';

export class TypeOrmConnection {
  private static connection: Connection;
  private constructor() {}
  public static async getConnection() {
    if (!this.connection) {
      this.connection = await createConnection({
        type: 'better-sqlite3',
        database: getConfig().databaseName,
        entities: [
          Address,
          Credential,
          Image,
          Information,
          Item,
          Mission,
          Task,
          Time,
          User,
        ],
        synchronize: true,
      });
    }
    return this.connection;
  }
}
