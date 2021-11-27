import App from './app.js';
import {initializeDatabase} from './libs/database';
import UserComponent from './api/user/component';
import OrderComponent from './api/order/component';
async function  start() {
  await initializeDatabase('WASHSWAT');
  const app = new App([
    new UserComponent(),
    new OrderComponent()
  ]);
  app.listen();
}
start();