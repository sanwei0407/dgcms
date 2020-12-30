'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库

class CommonController extends Controller {
  // 前后台通用的上传模块
  async upload () {
    const { ctx } = this;
    const res = await ctx.service.common.upload(ctx);
    ctx.body = res;
  }
  // @author lk
  // @last update 2020年11月20日 16:00
  // @用户注册（新增）的接口 // 增加会员积分字段
  // @userName-用户名 pwd-用户密码 state-用户状态 phone-手机号码 qq-qq号 openId-微信openId wxNickName-微信nickName wxCity-微信城市 wxSex-微信性别
  // isDalete-1-删除0-未删除 vipIntegral-会员积分（默认值：0）
  async addUser () {
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
  async delUser () {
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

  async login () {
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

  async register () {
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

  async uc () {
    const { ctx } = this;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    return await ctx.render('theme/default/user/uc.nj');
  }
  async auth () {
    const { ctx } = this;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    return await ctx.render('theme/default/user/auth.nj');
  }

  async verify () {
    const { ctx } = this;
    const { uid } = ctx.session;
    if (!uid) return ctx.body = { success: false, info: '请重新登录', backurl: '/login' };

    const { phone, realname, idfront, idback, idNum } = ctx.request.body;
    if (!phone) return ctx.body = { success: false, info: '请填写手机号码' };
    if (!realname) return ctx.body = { success: false, info: '请填写真实姓名' };
    if (!idfront) return ctx.body = { success: false, info: '请上传身份证正面' };
    if (!idback) return ctx.body = { success: false, info: '请上传身份证反面' };
    if (!idNum) return ctx.body = { success: false, info: '请填写身份证号码' };
    const state = 2;
    try {
      await ctx.model.User.update({
        phone, realname, idfront, idback, idNum, state,
      }, {
        where: {
          uid,
        },
      });
      ctx.session.state = 2;
      ctx.body = { success: true, info: '请填写身份证号码', backurl: '/uc' };

    } catch (e) {
      ctx.body = { success: false, info: '提交失败' };
    }

  }


  // 个人志愿者
  async single () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据

    if (method === 'GET') return await ctx.render('theme/default/user/single.nj');
    try {
      const { uid } = ctx.session;
      if (!uid) return ctx.body = { success: false, info: '请重新登录', backurl: '/login' };
      const zy = await ctx.model.Zy.findOne({
        where: {
          uid,
          type: 1,
        },
      });

      if (zy) return ctx.body = { success: false, info: '已经提交过注册,不需要重复提交' };
      const inserData = { ...ctx.request.body };
      delete inserData.servertime;
      delete inserData.serverdir;

      await ctx.model.Zy.create({
        ...inserData,
        uid: ctx.session.uid,
        serverTime: ctx.request.body.servertime.join(),
        serverdir: ctx.request.body.serverdir.join(),
        type: 1,
      });
      ctx.body = { success: true };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false };
    }
  }
  // 团队志愿者
  async team () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据

    if (method === 'GET') return await ctx.render('theme/default/user/team.nj');

    try {
      const { uid } = ctx.session;
      if (!uid) return ctx.body = { success: false, info: '请重新登录', backurl: '/login' };
      const zy = await ctx.model.Zy.findOne({
        where: {
          uid,
          type: 2,
        },
      });
      if (zy) return ctx.body = { success: false, info: '已经提交过注册,不需要重复提交' };
      const inserData = { ...ctx.request.body };
      delete inserData.servertime;
      delete inserData.serverdir;

      await ctx.model.Zy.create({
        ...inserData,
        uid: ctx.session.uid,
        serverTime: ctx.request.body.servertime.join(),
        serverdir: ctx.request.body.serverdir.join(),
        type: 2,
      });
      ctx.body = { success: true };

    } catch (e) {
      console.log(e);
      ctx.body = { success: false };
    }

  }

  async artteam () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    if (method === 'GET') return await ctx.render('theme/default/user/artteam.nj');

  }

  // 用户的场馆预约
  async book () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    if (method === 'GET') return await ctx.render('theme/default/user/book.nj');

  }

  // 用户中心 我的活动

  async activity () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    if (method === 'GET') return await ctx.render('theme/default/user/activity.nj');

  }

  async createteam () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    if (method === 'GET') return await ctx.render('theme/default/user/createTeam.nj');
    try {
      const { uid } = ctx.session;
      if (!uid) return ctx.body = { success: false, info: '请重新登录', backurl: '/login' };

      await ctx.model.Artteam.create({
        ...ctx.request.body,
        uid,
      });
      ctx.body = {
        success: true,
        backurl: '/user/artteam',
      };
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        info: '创建失败',
      };
    }


  }

  // 用户端内容发布
  async publish () {
    const { ctx, app } = this;
    const { cate } = ctx.query;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    if (cate === 'team') ctx.locals.catename = '团队风采';
    ctx.locals.catename = '团队风采';
    if (method === 'GET') return await ctx.render('theme/default/user/publish.nj');
    try {
      const { uid } = ctx.session;
      await ctx.model.Article.create({
        ...ctx.request.body,
        state: 0,
        uid,
        addTime: Date.now(),
      });
      ctx.body = {
        success: true,
        backurl: '/user/artteam',
      };
    } catch (e) {
      ctx.body = {
        success: false,
        info: '发布失败',
      };
    }
  }

  // 文章编辑

  async editArticle () {
    const { ctx } = this;
    const { aid } = ctx.params;
    const _article = await ctx.model.Article.findByPk(aid);
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    ctx.locals.article = _article;
    if (method === 'GET') return await ctx.render('theme/default/user/editArticle.nj');
    try {
      await ctx.model.Article.update({ ...ctx.request.body }, {
        where: {
          aid,
        },
      });
      ctx.body = { success: true, info: 'ok', backurl: '/user/artteam' };
    } catch (e) {
      ctx.body = { success: false, info: 'no ok' };
    }

  }

  // 退出
  async quit () {
    const { ctx } = this;
    ctx.session = null;
    ctx.redirect('./');
  }

}

module.exports = CommonController;
