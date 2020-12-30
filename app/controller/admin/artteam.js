'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ArtteamController extends Controller {
  // @author lk
  async finfAllArtteam() {
    const { ctx, app } = this;
    let { name, type, zone, address, buildTime, endTime, uid, nums, state, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { };
    if (type) where.type = { [Op.like]: '%' + type + '%' };
    if (name) where.name = { [Op.like]: '%' + name + '%' };
    if (zone) where.zone = { [Op.like]: '%' + zone + '%' };
    if (state) where.state = { [Op.like]: '%' + state + '%' };
    if (uid) where.uid = { [Op.like]: '%' + uid + '%' };
    if (address) where.address = { [Op.like]: '%' + address + '%' };
    if (buildTime) where.buildTime = { [Op.like]: '%' + buildTime + '%' };
    if (endTime) where.endTime = { [Op.like]: '%' + endTime + '%' };
    if (nums) where.nums = { [Op.like]: '%' + nums + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Artteam.findAndCountAll({
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
  async finfOneArtteam() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不正确' };
    try {
      const res = await ctx.model.Artteam.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该id不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }

  // @author lk
  async editArtteam() {
    const { ctx } = this;
    const { id, state } = ctx.request.body;
    const update = {};
    if (state) update.state = state;

    try {
      await ctx.model.Artteam.update(
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

module.exports = ArtteamController;
