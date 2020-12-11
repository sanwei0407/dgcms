'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class UserController extends Controller {
  // @author zbx
  // @last update 2020年11月11日 10:50
  // @用户编辑的接口
  // @userName-用户名 pwd-用户密码 phone-手机号码 qq-qq号 wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别 uid-用户id
  async AdEditUser() {
    const { ctx } = this;
    let { userName, pwd, phone, qq, wxNickName, wxCity, wxSex, uid } = ctx.request.body;
    const update = {};
    if (userName) update.userName = userName;
    if (pwd) update.pwd = utils.md5(pwd);
    if (phone) update.pwd = phone;
    if (qq) update.qq = qq;
    if (wxNickName) update.wxNickName = wxNickName;
    if (wxCity) update.wxCity = wxCity;
    if (wxSex) update.wxSex = wxSex;

    // 数据过滤
    if (!userName) return ctx.body = { success: false, info: '必须填写真实姓名' };
    if (!phone) return ctx.body = { success: false, info: '必须填写手机号码' };
    // 手机号码检验
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      await ctx.model.User.update(
        update,
        {
          where: {
            uid,
          },
        }
      );
      ctx.body = { success: true, info: '修改成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '修改失败' };
    }
  }


  // @author zbx
  // @last update 2020年11月11日 14:30
  // @查询所有用户信息的接口，也可以通过搜索用户名/手机号码来查询对应的数据
  // @userName-用户名 phone-手机号码
  async AdFindUserList() {
    const { ctx, app } = this;
    let { userName, phone, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (userName) where.userName = { [Op.like]: '%' + userName + '%' };
    if (phone) where.phone = { [Op.like]: '%' + phone + '%' };

    limit = limit ? limit : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.User.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'pwd', 'openId' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author zbx
  // @last update 2020年11月11日 10:50
  // @通过id号获取当前用户的详情的接口
  // @uid-用户id
  async AdFindOneUser() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '用户id不正确' };
    try {
      const res = await ctx.model.User.findByPk(uid, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该用户id不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }
}

module.exports = UserController;
