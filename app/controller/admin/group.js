'use strict';
const Controller = require('egg').Controller;


class AdminController extends Controller {
  // @author zbx
  // @last update 2020年12月16日 23：35
  // @增加角色（用户组）的接口
  async addGroup() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { name } = ctx.request.body;
    try {
      const res = await ctx.model.Group.findAll({
        where: {
          [Op.or]:
              [
                { name },
              ],
        },
      });
      if (res[0]) {
        ctx.body = { success: false, info: '该角色已注册' };
        return;
      }
      const res2 = await ctx.model.Group.create({
        name, // 名称
      });
      ctx.body = { success: true, info: '添加成功', data: res2 };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败' };
      console.log(e);
    }
  }
  // @author zbx
  // @last update 2020年11月24日 21:30
  // @查询角色的接口
  async findGroup() {
    const { ctx, app } = this;
    let { name, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (name) where.name = { [Op.like]: '%' + name + '%' };
    limit = limit ? limit : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Group.findAndCountAll({
        where,
        limit,
        offset,
        raw: true,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author zbx
  // @last update 2020年11月25日 14:50
  // @通过id号获取当前角色的详情的接口
  // @groupId-角色groupId
  async findOneGroup() {
    const { ctx } = this;
    const { groupId } = ctx.request.body;
    try {
      const res = await ctx.model.Group.findByPk(groupId, { raw: true });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }
  // @author zbx
  // @last update 2020年12月16日 17:10
  // @通过管理员名称name获取当前角色的详情的接口
  // @name-用户组名称name
  async findNameGroup() {
    const { ctx } = this;
    const { name } = ctx.request.body;
    try {
      const res = await ctx.model.Group.findOne({
        where: { name },
        raw: true,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }

  // @author zbx
  // @last update 2020年11月25日 09:50
  // @编辑角色的接口
  async editGroup() {
    const { ctx } = this;
    const { name, groupId, roles } = ctx.request.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (roles) updateData.roles = roles;
    try {
      const res = await ctx.model.Group.update(updateData, {
        where: {
          groupId,
        },
      });
      ctx.body = { success: true, info: '编辑成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '编辑失败' };
      console.log(e);
    }

  }

  // @author zbx
  // @last update 2020年11月24日 16:50
  // @删除角色的接口
  async delGroup() {
    const { ctx } = this;
    const { groupId } = ctx.request.body;
    try {
      await ctx.model.Group.destroy({
        where: {
          groupId,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
      console.log(e);
    }
  }
}

module.exports = AdminController;
