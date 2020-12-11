'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ShopuserController extends Controller {
  // 电商用户登录
  async shopUserLogin() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    const pwdd = utils.md5(password);
    try {
      const res = await ctx.model.Shopuser.findOne({
        where: {
          username,
        },
      });
      if (pwdd === res.password) { // 密码正确
        ctx.body = {
          success: true,
          msg: '登录成功',
          data: {
            username: res.username,
          },
        };
      }
      if (pwdd !== res.pwd) { // 密码错误
        ctx.body = { success: false, msg: '密码错误' };
      }
    } catch (e) {
      ctx.body = { success: false, msg: '用户名不存在' + e };
      console.log('error!!!' + e);// 输出报错
    }
  }
  // 用户注册
  async shopUsersAdd() {
    const { ctx } = this;
    const { username, password, phone, sex } = ctx.request.body;
    if (!username) return ctx.body = { success: false, info: '请填写用户姓名' };
    if (!password) return ctx.body = { success: false, info: '请填写密码' };
    if (!phone) return ctx.body = { success: false, info: '请填写手机号码' };
    if (!sex) return ctx.body = { success: false, info: '请选择性别' };
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      ctx.model.Shopuser.create({
        username,
        password: utils.md5(password),
        phone,
        sex,
        creatime: Date.now(),
      });
      ctx.body = { success: true, info: '用户注册成功' };
    } catch (e) {
      ctx.body = { success: false, info: '用户注册失败' };
      console.log(e);
    }
  }
  // 修改用户信息
  async shopUsersUpdate() {
    const { ctx } = this;
    const { id, username, password, phone } = ctx.request.body;
    const update = {};
    if (username) update.username = username;
    if (password) update.password = utils.md5(password);
    if (phone) update.phone = phone;
    // 数据过滤
    if (!phone) return ctx.body = { success: false, info: '手机号未填写' };
    if (!password) return ctx.body = { success: false, info: '密码未填写' };
    // 手机号码检验
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      const res = await ctx.model.Shopuser.findOne({
        where: {
          phone,
        },
      }
      );
      res.update(
        update,
        {
          where: {
            id,
          },
        }
      );
      ctx.body = { success: true, msg: '修改成功', update };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: '修改失败', e };
    }
  }
  // 查询用户列表
  async shopUserFind() {
    const { ctx, app } = this;
    let { username, phone, sex, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (username) where.username = { [Op.like]: '%' + username + '%' };
    if (phone) where.phone = { [Op.phone]: '%' + phone + '%' };
    if (sex) where.sex = sex;
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Shopuser.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, info: '查询成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // 删除用户
  async shopUserDel() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      const res = await ctx.model.Shopuser.destroy({
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '删除成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
      console.log(e);
    }
  }
}

module.exports = ShopuserController;
