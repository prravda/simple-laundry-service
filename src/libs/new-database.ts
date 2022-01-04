import Database from 'better-sqlite3';
import { createTablesQueries } from './create-tables-queries';

// instance 가 한 번 생성되고 나서는 다시 생성되지 않게 처리하기 위해서
// singleton pattern 으로 database 를 처리하기 위해 작성한 file 입니다.
// 다만, better-sqlite3 이 declare 등의 keyword 로 d.ts 가 정의되어있어
// 해당 정의를 바꾸기 위해서는 library level 까지도 수정을 해야 하기 때문에
// @ts-ignore comment 로 any type 을 부득이하게 허용하게 되었습니다.
// 이 점 앙해 부탁드립니다.
export class NewDatabase {
  // @ts-ignore
  private static database;
  private constructor() {}
  public static getDatabase() {
    if (!this.database) {
      this.database = new Database('washswot');
      this.database.exec(createTablesQueries);
    }
    return this.database;
  }
}
