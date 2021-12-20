import { Router } from 'express';
import successWrapper from '../../libs/success';
import BadRequestException from '../../exceptions/badRequestException';
import { signing } from '../../middlewares/auth';

import UserService from './service';
import Dao from './dao';

export default class UserComponent {
  router = Router();
  service = new UserService(new Dao());

  getService(){
    return this.service;
  }

  constructor () {
    this.initializeRouter();
  }
  initializeRouter(){
    const router = Router();
    const path = '/order';
    router
    .get('/', successWrapper(this.orderList))
    .get('/:taskId', successWrapper(this.findOrder))
    .post('/', successWrapper(this.register))
    // .get('/me', successWrapper(this.me))
    this.router.use(path, router);
  }

  /**
   * @description 고객의 주문 리스트를 가져온다.
   */
  orderList = (req,res) => {
    const { UUID } = req.user;
    //TODO API 셋팅 해주세요
    /**
     * @example
     * https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
     */
  }

  /**
   * @description taskId로 주문을 가져온다.
   */
  findOrder = (req,res) => {
    const { UUID } = req.user;
    const { taskId } = req.params;
    //TODO API 셋팅 해주세요
    /******************************/
    /**
     * @example
     * https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
     */
  }

  /**
   * @description 주문을 등록한다.
   */
  register = (req,res) => {
    const { UUID } = req.user;
    //TODO API 셋팅 해주세요
    /******************************/
    /**
     * @example
     * https://s3.ap-northeast-2.amazonaws.com/com.washswat.assets/dev/rn.json
     */
  }

}
