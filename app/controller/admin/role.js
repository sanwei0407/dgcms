'use strict';
const Controller = require('egg').Controller;


class AdminController extends Controller {
  // @author zbx
  // @last update 2020年11月24日 13:15
  // @增加权限的接口
  async addRole() {
    const { ctx } = this;
    const { name, path, pid, action } = ctx.request.body;
    try {
      await ctx.model.Role.create({
        name, // 名称
        path, // 地址路径
        pid, // 上级id
        action, // 操作
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败' };
      console.log(e);
    }
  }
  // @author zbx
  // @last update 2020年11月24日 14:30
  // @查询权限的接口
  async findRole() {
    const { ctx, app } = this;
    let { name, path, pid, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (name) where.name = { [Op.like]: '%' + name + '%' };
    if (path) where.path = { [Op.like]: '%' + path + '%' };
    if (pid) where.pid = { [Op.like]: pid + '%' };
    // limit = limit ? limit : 20;
    // page = page ? page : 1;
    // const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Role.findAndCountAll({
        where,
        limit,
        // offset,
        attributes: {
          exclude: [ 'path' ],
        },
        raw: true,
      });
      console.log('res', res.rows); // [{},{}]
      const _arr = res.rows.map(r => ({ ...r, children: [] }));
      for (const item of _arr) {
        if (item.pid > 0) {
          const parent = _arr.find(r => r.id === item.pid); // 找出儿子的pid==父亲的id
          if (parent) { // 如果有的话 就把自己放到父栏目的children里面
            parent.children.push(item);
          }
        }
      }
      const TreeDate = _arr.filter(r => r.pid === 0);
      // TreeDate.push({ id: '0', name: '首页' });
      ctx.body = { success: true, data: TreeDate };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author zbx
  // @last update 2020年11月25日 14:50
  // @通过id号获取当前角色的详情的接口
  // @id-角色id
  async findOneRole() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    // if (!groupId) return ctx.body = { success: false, info: '用户组id不存在' };
    try {
      const res = await ctx.model.Role.findByPk(id, {
        raw: true,
        attributes: {
          exclude: [ 'action' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }

  // @author zbx
  // @last update 2020年11月24日 16:50
  // @删除权限的接口
  async delRole() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Role.destroy({
        where: {
          id,
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
