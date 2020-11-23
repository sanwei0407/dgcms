'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class UserController extends Controller {
  // @author zbx
  // @last update 2020年11月11日 10:30
  // @用户注册（新增）的接口
  // @userName-用户名 pwd-用户密码 state-用户状态 phone-手机号码 qq-qq号 openId-微信openId wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别
  async addUser() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { userName, pwd, state, phone, qq, openId, wxNickName, wxCity, wxSex } = ctx.request.body;
    // 过滤数据
    if (!userName) return ctx.body = { success: false, info: '请填写用户名' };
    if (!pwd) return ctx.body = { success: false, info: '请填写密码' };
    if (!qq) return ctx.body = { success: false, info: '请填写qq' };
    if (!openId) return ctx.body = { success: false, info: '请填写微信openId' };
    if (!wxNickName) return ctx.body = { success: false, info: '请填写微信nickName' };
    if (!wxCity) return ctx.body = { success: false, info: '请填写微信城市' };
    if (!wxSex) return ctx.body = { success: false, info: '请填写微信性别' };
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
                          { qq },
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
      const res = await ctx.model.User.destroy({
        where: {
          uid,
        },
      });
      if (res) {
        return ctx.body = { success: true, info: '删除成功' };
      }
      return ctx.body = { success: false, info: '删除失败' };

    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // @author zbx
  // @last update 2020年11月11日 10:50
  // @用户编辑的接口
  // @userName-用户名 pwd-用户密码 phone-手机号码 qq-qq号 wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别 uid-用户id
  async aditUser() {
    const { ctx } = this;
    const { userName, pwd, phone, qq, wxNickName, wxCity, wxSex, uid } = ctx.request.body;
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
  // @last update 2020年11月11日 10:50
  // @查询所有用户信息的接口，也可以通过搜索用户名/手机号码来查询对应的数据
  // @userName-用户名 phone-手机号码
  async findUserList() {
    const { ctx, app } = this;
    let { userName, phone, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (userName) where.userName = { [Op.like]: userName + '%' };
    if (phone) where.phone = { [Op.like]: phone + '%' };

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
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // @author zbx
  // @last update 2020年11月11日 10:50
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
  // @last update 2020年11月11日 11:36
  // @用户登录的接口
  // @userName-用户名 pwd-用户密码 phone-手机号码 qq-qq号 （可以通过用户名/手机号码/qq其中一个进行登录）
  async userLogin() {
    const { ctx, app } = this;
    const { userName, pwd, phone, qq } = ctx.request.body;
    const { Op } = app.Sequelize;
    const password = utils.md5(pwd);
    const _w = {};
    if (userName) _w.userName = { [Op.like]: userName + '%' };
    if (phone) _w.phone = { [Op.like]: phone + '%' };
    if (qq) _w.qq = { [Op.like]: qq + '%' };
    try {
      const res = await ctx.model.User.findOne({
        where: _w,
      });
      if (password === res.dataValues.pwd) {
        ctx.body = {
          success: true,
          data: {
            userName: res.userName,
            state: res.state,
            phone: res.phone,
            qq: res.qq,
            wxNickName: res.wxNickName,
            wxCity: res.wxCity,
            wxSex: res.wxSex,
          },
          info: '登录成功',
        };
      } else {
        ctx.body = { success: false, info: '用户密码不匹配' };
      }
    } catch (e) {
      ctx.body = { success: false, info: '用户密码不匹配' };
    }
  }


}

module.exports = UserController;
