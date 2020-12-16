'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库
class JournalController extends Controller {
  // 创建交易记录
  async journalAdd() {
    const { ctx } = this;
    const { uid, beforfee, changefee } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '未找到用户id' };
    if (!beforfee) return ctx.body = { success: false, info: '未找到交易前金额' };
    if (!changefee) return ctx.body = { success: false, info: '未找到交易后金额' };
    try {
      ctx.model.Journal.create({
        uid,
        beforfee,
        changefee,
        afterfee: beforfee * 1 + changefee * 1,
        addTime: Date.now(),
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败' };
    }
  }
  // 查询订单
  async journalFind() {
    const { ctx } = this;
    let { uid, addTime, limit, page } = ctx.request.body;
    const where = {};
    if (uid) where.uid = uid;
    if (addTime) where.addTime = addTime;
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Journal.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

}

module.exports = JournalController;
