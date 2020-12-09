'use strict';
const Controller = require('egg').Controller;


class AdminController extends Controller {
  // @author zbx
  // @last update 2020年11月24日 13:15
  // @增加权限的接口
  async addRole() {
    const { ctx } = this;
    const { name, path, pid, action, icon } = ctx.request.body;
    try {
      console.log('090090', icon);
      const zbx = await ctx.model.Role.create({
        name, // 名称
        path: path ? path : '', // 地址路径
        pid, // 上级id
        action, // 操作
        icon, // 图标
      });
      console.log('zbxzbxzbx', zbx);
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
    const { name, path, pid } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (name) where.name = { [Op.like]: '%' + name + '%' };
    if (path) where.path = { [Op.like]: '%' + path + '%' };
    if (pid) where.pid = { [Op.like]: pid + '%' };
    try {
      const res = await ctx.model.Role.findAndCountAll({
        where,
        // attributes: {
        //   exclude: [ 'path' ],
        // },
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
  // @last update 2020年11月24日 14:30
  // @通过路径查询该路径的详情
  async findPath() {
    const { ctx, app } = this;
    const { path, userName } = ctx.request.body;
    const { Op } = app.Sequelize;
    try {
      // 通过当前角色名称---获取到对应到权限roles
      const name = await ctx.model.Admin.findOne({
        where: {
          userName,
        },
        attributes: {
          exclude: [ 'pwd' ],
        },
      });
      const groupId = name.dataValues.groupId;
      const groupRole = await ctx.model.Group.findByPk(groupId, { raw: true });
      const rolesArr = groupRole.roles.split(',').filter(r => r !== ',').map(Number);
      // 通过当前页面到路径--获取当前页面所拥有的按钮，如：['删除'，'编辑']
      const where = {};
      if (path) where.path = path;
      const res = await ctx.model.Role.findOne({
        where,
        raw: true,
      });
      const box = {};
      box.pid = res.id;
      const resAction = await ctx.model.Role.findAndCountAll({
        where: box,
        raw: true,
      });
      const actionId = []; // 当前页面的按钮属性的----id值
      for (const item of resAction.rows) {
        actionId.push(item.id);
      }
      // console.log('actionId', actionId);
      // console.log('rolesArr', rolesArr);
      const _yes = []; // 存放页面中有的按钮权限的id
      for (const item of actionId) {
        if (rolesArr.includes(item)) {
          // console.log('存在', item);
          _yes.push(item);
        }
      }
      const resRole = await ctx.model.Role.findAll({ where: {
        id: {
          [Op.in]: _yes,
        },
      },
      raw: true,
      });
      console.log('resRole', resRole);
      const actionArr = []; // 当前页面的按钮属性集合
      for (const item of resRole) {
        console.log('item.name', item.name);
        actionArr.push(item.name);
      }
      res.action = actionArr;
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
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
