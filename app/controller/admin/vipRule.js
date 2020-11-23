'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class VipRuleController extends Controller {
  // @author undefined
  // @last update 2020年11月23日 11:29
  // @会员规则的接口
  // vipGrade-会员的等级 vipIntegral-会员等级所需对应的积分 例：vip1 -> 200 , vip2 -> 400

  async addvipRule() {
    const { ctx, app } = this;
    const { vipGrade, vipIntegral } = ctx.request.body;
    if (!vipGrade) return ctx.body = { success: false, info: '请填写会员等级' };
    if (!vipIntegral) return ctx.body = { success: false, info: '请填写会员等级对应的积分' };
    try {
      await ctx.model.Viprule.create({
        vipGrade,
        vipIntegral,
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '错误信息', e };
    }
  }
  async delvipRule() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '请传id' };
    try {
      await ctx.model.Viprule.update({
        isDelete: 1,
      },
      {
        where: {
          id,
        },
      });
      ctx.body = { success: true, msg: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, msg: '删除失败', e };
    }
  }
  async findvipRule() {
    const { ctx, app } = this;
    let { vipGrade, vipIntegral, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (vipGrade) where.vipGrade = { [Op.like]: '%' + vipGrade + '%' };
    if (vipIntegral) where.vipIntegral = { [Op.like]: '%' + vipIntegral + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Viprule.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }
  async editvipRule() {
    const { ctx } = this;
    const { vipGrade, vipIntegral, id } = ctx.request.body;
    const update = {};
    if (vipGrade) update.vipGrade = vipGrade;
    if (vipIntegral) update.vipIntegral = vipIntegral;
    if (!id) return ctx.body = { success: false, msg: '该会员制不存在' };
    try {
      const res = await ctx.model.Viprule.update(
        update,
        {
          where: {
            id,
          },
        }
      );
      ctx.body = { success: true, msg: '修改成功', data: res };
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        msg: '修改失败',
      };
    }
  }
}

module.exports = VipRuleController;
