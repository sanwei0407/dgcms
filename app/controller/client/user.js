'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class UserController extends Controller {


  // @author zbx
  // @last update 2020年11月11日 10:50
  // @用户编辑的接口
  // @userName-用户名 pwd-用户密码 phone-手机号码 qq-qq号 wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别 uid-用户id
  async editUser() {
    const { ctx } = this;
    const { userName, pwd, phone, qq, wxNickName, wxCity, wxSex, uid, state } = ctx.request.body;
    const update = {};
    if (userName) update.userName = userName;
    if (pwd) update.pwd = utils.md5(pwd);
    if (phone) update.phone = phone;
    if (qq) update.qq = qq;
    if (wxNickName) update.wxNickName = wxNickName;
    if (wxCity) update.wxCity = wxCity;
    if (wxSex) update.wxSex = wxSex;
    if (state) update.state = state;

    // 数据过滤
    // if (!userName) return ctx.body = { success: false, info: '必须填写真实姓名' };
    // if (!phone) return ctx.body = { success: false, info: '必须填写手机号码' };
    // 手机号码检验
    // if (!(/^1[3456789]\d{9}$/.test(update))) {
    //     ctx.body = { success: false, info: '请输入正确的手机号' };
    //     return;
    // }
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
  // @last update 2020年11月11日 14:50
  // @通过id号获取当前用户的详情的接口
  // @uid-用户id
  async findOneUser() {
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

  // @author zbx
  // @last update 2020年11月11日 15:20
  // @用户登录的接口
  // @userName-用户名 pwd-用户密码 phone-手机号码 qq-qq号 （可以通过用户名/手机号码/qq其中一个进行登录）
  // async userLogin() {
  //   const { ctx, app } = this;
  //   const { userName, pwd, phone, qq } = ctx.request.body;
  //   const { Op } = app.Sequelize;
  //   const password = utils.md5(pwd);
  //   const _w = {};
  //   if (userName) _w.userName = { [Op.like]: '%' + userName + '%' };
  //   if (phone) _w.phone = { [Op.like]: '%' + phone + '%' };
  //   if (qq) _w.qq = { [Op.like]: qq + '%' };
  //   try {
  //     const res = await ctx.model.User.findOne({
  //       where: _w,
  //     });
  //     if (password === res.dataValues.pwd) {
  //       ctx.body = {
  //         success: true,
  //         data: {
  //           userName: res.userName,
  //           state: res.state,
  //           phone: res.phone,
  //           qq: res.qq,
  //           wxNickName: res.wxNickName,
  //           wxCity: res.wxCity,
  //           wxSex: res.wxSex,
  //         },
  //         info: '登录成功',
  //       };
  //     } else {
  //       ctx.body = { success: false, info: '用户密码不匹配' };
  //     }
  //   } catch (e) {
  //     ctx.body = { success: false, info: '用户密码不匹配' };
  //   }
  // }


}

module.exports = UserController;
