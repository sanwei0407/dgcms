'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ActionsController extends Controller {
  // @author lk
  async finfAllActions() {
    const { ctx, app } = this;
    let { type, state, uid, activityId, bookId, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { };
    if (type) where.type = { [Op.like]: '%' + type + '%' };
    if (state) where.state = { [Op.like]: '%' + state + '%' };
    if (uid) where.uid = { [Op.like]: '%' + uid + '%' };
    if (activityId) where.activityId = { [Op.like]: '%' + activityId + '%' };
    if (bookId) where.bookId = { [Op.like]: '%' + bookId + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Actions.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author lk
  async finfOneActions() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不正确' };
    try {
      const res = await ctx.model.Actions.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该id不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }

  // @author lk
  async editActions() {
    const { ctx } = this;
    const { id, state, beizhu } = ctx.request.body;
    const update = {};
    if (state) update.state = state;
    if (beizhu) update.beizhu = beizhu;
    update.updateTime = Date.now(); // 更新时间;

    try {
      await ctx.model.Actions.update(
        update,
        {
          where: {
            id,
          },
        }
      );
      ctx.body = { success: true, info: '修改成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '修改失败' };
    }
  }

}

module.exports = ActionsController;
