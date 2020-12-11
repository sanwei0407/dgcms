'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库
class ShoppayinfoController extends Controller {
  // 创建支付
  async shopPayinfoAdd() {
    const { ctx } = this;
    const { userid, orderid, payplatform, platformnumber, platformstatus } = ctx.request.body;
    if (!userid) return ctx.body = { success: false, info: '请填写用户id' };
    if (!orderid) return ctx.body = { success: false, info: '请填写订单id' };
    if (!payplatform) return ctx.body = { success: false, info: '请填写支付平台' };
    if (!platformnumber) return ctx.body = { success: false, info: '请填写支付流水号' };
    if (!platformstatus) return ctx.body = { success: false, info: '请填写支付状态' };
    try {
      ctx.model.Shoppayinfo.create({
        userid,
        orderid,
        payplatform,
        platformnumber,
        platformstatus,
        createtime: Date.now(),
      });
      ctx.body = { success: true, info: '创建支付成功' };
    } catch (e) {
      ctx.body = { success: false, info: '创建支付失败' };
      console.log(e);
    }
  }
}

module.exports = ShoppayinfoController;
