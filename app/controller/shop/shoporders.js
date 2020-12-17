'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库
class ShopOrdersController extends Controller {
  // 创建订单
  async shopOrdersAdd() {
    const { ctx } = this;
    const { userid, shoppingid, payment, postage, status, paymenttype, paymenttime, sendtime, endtime, closetime } = ctx.request.body;
    if (!userid) return ctx.body = { success: false, info: '请填写用户id' };
    if (!shoppingid) return ctx.body = { success: false, info: '请填写收货信息编号' };
    if (!payment) return ctx.body = { success: false, info: '请填写实付金额' };
    if (!postage) return ctx.body = { success: false, info: '请填写运费' };
    if (!status) return ctx.body = { success: false, info: '请填写订单状态' };
    if (!paymenttype) return ctx.body = { success: false, info: '请填写付款类型' };
    if (!paymenttime) return ctx.body = { success: false, info: '请填写交付时间' };
    if (!sendtime) return ctx.body = { success: false, info: '请填写发货时间' };
    if (!endtime) return ctx.body = { success: false, info: '请填写订单完成时间' };
    if (!closetime) return ctx.body = { success: false, info: '请填写交易关闭时间' };
    try {
      const res = await ctx.model.Shoporders.create({
        userid,
        shoppingid,
        payment,
        postage,
        status,
        paymenttype,
        paymenttime,
        sendtime,
        endtime,
        closetime,
        createtime: Date.now(),
        isDelete: '0',
      });
      console.log(res)
      ctx.body = { success: true, info: '创建订单成功' };
    } catch (e) {
      ctx.body = { success: false, info: '创建订单失败' };
      console.log(e);
    }
  }

  // 软删除订单
  async shopOrdersDel() {
    const { ctx } = this;
    const { orderid } = ctx.request.body;
    try {
      await ctx.model.Shoporders.update(
        {
          isDelete: 1,
        },
        {
          where: {
            orderid,
          },
        });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 查询订单
  async shopOrdersFind() {
    const { ctx, app } = this;
    let { ordersid, userid, shoppingid, payment, postage, status, paymenttype, paymenttime, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (userid) where.userid = { [Op.like]: '%' + userid + '%' };
    if (shoppingid) where.shoppingid = { [Op.like]: '%' + shoppingid + '%' };
    if (payment) where.payment = { [Op.like]: '%' + payment + '%' };
    if (postage) where.postage = { [Op.like]: '%' + postage + '%' };
    if (status) where.status = { [Op.like]: '%' + status + '%' };
    if (paymenttype) where.paymenttype = { [Op.like]: '%' + paymenttype + '%' };
    if (paymenttime) where.paymenttime = { [Op.like]: '%' + paymenttime + '%' };
    if (ordersid) where.ordersid = { [Op.like]: '%' + ordersid + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Shoporders.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'isDelete' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // 修改订单
  async shopOrdersUpdate() {
    const { ctx } = this;
    const { orderid, userid, shoppingid, payment, postage, status, paymenttype, paymenttime, sendtime, endtime, closetime } = ctx.request.body;
    const update = {};
    if (userid) update.userid = userid;
    if (shoppingid) update.shoppingid = shoppingid;
    if (payment) update.payment = payment;
    if (postage) update.postage = postage;
    if (status) update.status = status;
    if (paymenttype) update.paymenttype = paymenttype;
    if (paymenttime) update.paymenttime = paymenttime;
    if (sendtime) update.sendtime = sendtime;
    if (endtime) update.endtime = endtime;
    if (closetime) update.closetime = closetime;
    try {
      const res = await ctx.model.Shoporders.update(update, {
        where: {
          orderid,
        },
      });
      ctx.body = { success: true, info: '修改成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败', e };
    }
  }

  // 查询订单（前端用）
  async appOrdersFind() {
    const { ctx } = this;
    const where = { isDelete: 0 };
    try {
      const res = await ctx.model.Shoporders.findAndCountAll({
        where,
        attributes: {
          exclude: [ 'isDelete' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }
}

module.exports = ShopOrdersController;
