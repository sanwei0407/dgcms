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

  // 富文本编辑内容

  async editorupload() {
    const { ctx } = this;
    try{
      const res = await ctx.service.common.upload(ctx);
      if (res.success) {
        ctx.body = {
          errno: 0,
          data: [
            res.msg,
          ],
        };
      } else {
        ctx.body = {
          errno: 1,
        };
      }
    }catch (e) {
      console.log(e)
    }


  }
  // @author lk
  // @last update 2020年11月20日 16:00
  // @用户注册（新增）的接口 // 增加会员积分字段
  // @userName-用户名 pwd-用户密码 state-用户状态 phone-手机号码 qq-qq号 openId-微信openId wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别
  // isDalete-1-删除0-未删除 vipIntegral-会员积分（默认值：0）
  async addUser() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { pwd, phone, userName } = ctx.request.body;
    // 过滤数据
    if (!pwd) return ctx.body = { success: false, info: '请填写密码' };
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      // 账号信息的过滤（查看是否已注册）
      const res = await ctx.model.User.findAll({
        where: {
          phone,
        },
      });
      console.log('????', res);
      if (res[0]) {
        const password = utils.md5(pwd);
        const _w = {};
        if (userName) _w.userName = { [Op.like]: '%' + userName + '%' };
        if (phone) _w.phone = { [Op.like]: '%' + phone + '%' };
        try {
          const res = await ctx.model.User.findOne({
            where: _w,
          });
          if (password === res.dataValues.pwd) {
            ctx.body = {
              success: true,
              data: {
                uid: res.uid,
                userName: res.userName,
                state: res.state,
                phone: res.phone,
                qq: res.qq,
                wxNickName: res.wxNickName,
                wxCity: res.wxCity,
                wxSex: res.wxSex,
                openId: res.openId,
                heardPhoto: res.heardPhoto,
              },
              info: '登录成功',
            };
          } else {
            ctx.body = { success: false, info: '用户密码不匹配' };
          }
        } catch (e) {
          ctx.body = { success: false, info: '用户密码不匹配' };
        }
      } else {
        const password = utils.md5(pwd);
        try {
          await ctx.model.User.create({
            phone, // 手机号码
            pwd: password, // 密码
            addTime: Date.now(), // 注册时间
          });
          ctx.body = { success: true, info: '注册成功' };
        } catch (e) {
          ctx.body = { success: false, info: '注册失败' };
          console.log(e);
        }
      }
    } catch (e) {
      ctx.body = { success: false, info: '注册失败2' };
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

  async login() {
    const { ctx } = this;
    const { phone, pwd } = ctx.request.body;
    const { backUrl } = ctx.query;
    const method = ctx.req.method;
    console.log('method', method);
    if (method === 'GET') return await ctx.render('theme/default/login.nj');
    const _u = await ctx.model.User.findOne({
      where: {
        phone,
        pwd: utils.md5(pwd),
      },
    });
    if (!_u) return ctx.body = { success: false, info: '账号不存在或者密码错误' };
    ctx.session.uid = _u.uid;
    ctx.session.username = _u.userName;
    ctx.session.phone = _u.phone;
    ctx.body = { success: true, info: 'info', backUrl };
  }

  async register() {
    const { ctx } = this;
    const method = ctx.req.method;
    if (method === 'GET') return await ctx.render('theme/default/register.nj');
    const { phone, pwd, code } = ctx.request.body;
    const _u = await ctx.model.User.findOne({
      where: {
        phone,
      },
    });
    if (_u) return ctx.body = { success: false, info: '该手机号码已经注册会员' };
    try {
      const res = await ctx.model.User.create({
        phone,
        pwd: utils.md5(pwd),
      });

      ctx.session.uid = res.uid;
      ctx.session.phone = res.phone;
      ctx.body = { success: true, info: '注册成功' };
    } catch (e) {
      ctx.body = { success: false, info: '注册失败' };
    }

  }

  async uc() {
    const { ctx } = this;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    return await ctx.render('theme/default/uc.nj');
  }

}

module.exports = CommonController;
