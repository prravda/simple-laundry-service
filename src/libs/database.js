import Database from 'better-sqlite3';
export let database;

export async function initializeDatabase(filename, options) {
  database = new Database(filename, options);
}
export async function close() {
  if (database) {
    database.close();
  }
}
export function transaction(cb) {
  let result;
  database.transaction(() => {
    result = cb();
  })();
  return result;
}
