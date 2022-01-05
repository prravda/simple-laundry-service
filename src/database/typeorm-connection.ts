import { getConfig } from '../config';
import { Connection, createConnection } from 'typeorm';
import { User } from './entities/user';
import { Credential } from './entities/credential';
import { Address } from './entities/address';
import { Task } from './entities/task';
import { Information } from './entities/information';
import { Time } from './entities/time';
import { Mission } from './entities/mission';
import { Item } from './entities/item';
import { Tag } from './entities/tag';
import { Image } from './entities/image';

export class TypeOrmConnection {
  private static connection: Connection;
  private constructor() {}
  public static async getConnection() {
    if (!this.connection) {
      this.connection = await createConnection({
        type: 'better-sqlite3',
        database: getConfig().databaseName,
        entities: [
          User,
          Credential,
          Address,
          Task,
          Information,
          Time,
          Mission,
          Item,
          Tag,
          Image,
        ],
        synchronize: true,
      });
    }
    return this.connection;
  }
}
