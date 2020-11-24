'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库

class CommonController extends Controller {
  // 前后台通用的上传模块
  async upload() {
    const { ctx } = this;
    const res = await ctx.service.common.upload(ctx);
    ctx.body = res;
  }
  // @author lk
  // @last update 2020年11月20日 16:00
  // @用户注册（新增）的接口 // 增加会员积分字段
  // @userName-用户名 pwd-用户密码 state-用户状态 phone-手机号码 qq-qq号 openId-微信openId wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别
  // isDalete-1-删除0-未删除 vipIntegral-会员积分（默认值：0）
  async addUser() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { userName, pwd, state, phone, qq, openId, wxNickName, wxCity, wxSex } = ctx.request.body;
    // 过滤数据
    if (!userName) return ctx.body = { success: false, info: '请填写用户名' };
    if (!pwd) return ctx.body = { success: false, info: '请填写密码' };
    // if (!qq) return  ctx.body = { success: false, info: '请填写qq' };
    // if (!openId) return  ctx.body = { success: false, info: '请填写微信openId' };
    // if (!wxNickName) return  ctx.body = { success: false, info: '请填写微信nickName' };
    // if (!wxCity) return  ctx.body = { success: false, info: '请填写微信城市' };
    // if (!wxSex) return  ctx.body = { success: false, info: '请填写微信性别' };
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      // 账号信息的过滤（查看是否已注册）
      const res = await ctx.model.User.findAll({
        where: {
          [Op.or]:
              [
                { phone },
                { userName },
                // {qq}
              ],
        },
      });
      if (res[0]) {
        ctx.body = { success: false, info: '该账户已注册' };
        return;
      }
      const password = utils.md5(pwd);
      try {
        await ctx.model.User.create({
          userName, // 用户名
          phone, // 手机号码
          pwd: password, // 密码
          state, // 用户状态0 = 已注册/未审核; -1 = 用户被禁用; 1 = 正常;
          addTime: Date.now(), // 注册时间
          qq, // qq号
          openId, // 微信openId
          wxNickName, // 微信nickName
          wxCity, // 微信城市
          wxSex, // 微信性别
        });
        ctx.body = { success: true, info: '添加成功' };
      } catch (e) {
        ctx.body = { success: false, info: '添加失败' };
        console.log(e);
      }
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '添加失败2' };
      return;
    }


  }

  // @author zbx
  // @last update 2020年11月11日 10:45
  // @用户删除的接口
  // @uid-用户id
  async delUser() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '用户id不正确' };
    try {
      await ctx.model.User.update({
        isDelete: 1,
      },
      {
        where: {
          uid,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
    }
  }

}

module.exports = CommonController;
