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
        afterfee: beforfee * 1 - changefee * 1,
        addTime: Date.now(),
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败' };
    }
  }

}

module.exports = JournalController;
