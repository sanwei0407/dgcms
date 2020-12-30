'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class OneController extends Controller {
  // @author lk
  async findpagedatas() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const where = { pid: 0, isnav: 1 };
    const all = {};
    try {
      const res = await ctx.model.Category.findAndCountAll({
        where,
      });
      all.nav = res;
      const ress = await ctx.model.Article.findAndCountAll({
        limit: 6,
        order: [[ 'aid', 'DESC' ]],
      });
      all.article = ress;
      const resss = await ctx.model.Booking.findAndCountAll({
        limit: 3,
        order: [[ 'id', 'DESC' ]],
      });
      all.booking = resss;
      const ressss = await ctx.model.Activity.findAndCountAll({
        limit: 3,
        order: [[ 'id', 'DESC' ]],
      });
      all.Activity = ressss;
      ctx.body = { success: true, ...all };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

}

module.exports = OneController;
