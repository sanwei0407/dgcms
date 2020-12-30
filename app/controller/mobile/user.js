'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class UserController extends Controller {
  // @author zbx
  // @last update 2020年11月10日 16:45
  // 发送短信验证码
  // 暂时用不到
  // async smscode () {
  //   const { ctx, app } = this;
  //   const { phone } = ctx.request.body;
  //   console.log(phone);
  //   try {
  //     console.log(app.redis);
  //     const codeTemp = await app.redis.get(phone);
  //     if (!codeTemp) {
  //       // 判断redis中有没有code
  //       let code = '';
  //       const codeLength = 6; // 验证码的长度
  //       const selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
  //       // 所有候选组成验证码的字符，当然也可以用中文的
  //       for (let i = 0; i < codeLength; i++) {
  //         const charIndex = Math.floor(Math.random() * 10);
  //         code += selectChar[charIndex];
  //       }
  //       await app.redis.set(phone, code, 'EX', 60000);
  //       console.log('手机：', phone);
  //       console.log('验证码：', code);
  //       await this.ctx.sms.sendSMS({
  //         PhoneNumbers: phone,
  //         SignName: '冬瓜木头鸭',
  //         TemplateCode: 'SMS_205448600',
  //         TemplateParam: `{ "code" : "${code}"}`,
  //       });
  //       ctx.body = { success: true, info: '发送成功' };
  //     } else {
  //       const code = await app.redis.get(phone);
  //       await this.ctx.sms.sendSMS({
  //         PhoneNumbers: phone,
  //         SignName: '冬瓜木头鸭',
  //         TemplateCode: 'SMS_205448600',
  //         TemplateParam: `{ "code" : "${code}"}`,
  //       });
  //       ctx.body = { success: true, info: '发送成功' };
  //     }
  //   } catch (e) {
  //     console.log(e);
  //     ctx.body = { success: false, info: '发送失败' };
  //   }

  // }

  // @author zbx
  // @last update 2020年11月10日 16:45
  // 校验短信验证码
  // 暂时用不到
  // async checkSms () {
  //   const { ctx, app } = this;
  //   const { phone, code } = ctx.request.body;
  //   try {
  //     const codeTemp = await app.redis.get(phone);
  //     if (code === codeTemp) {
  //       ctx.body = { success: true, info: '验证码正确' };
  //     } else {
  //       ctx.body = { success: false, info: '验证码不正确' };
  //     }
  //   } catch (e) {
  //     ctx.body = { success: false, info: '验证码不正确' };
  //   }
  // }

  async userLogin () {
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
        }, raw: true
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
          if (password === res.pwd) {
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
            pwd: password, // 密码,
            userName,
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
  async addUser () {
    const { ctx } = this;
    const { phone, pwd } = ctx.request.body;
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    try {
      const res = await ctx.model.User.findOne({
        where: {
          phone,
        }, raw: true
      })
      console.log('asdasd', res)
      if (res) return ctx.body = { msg: '该用户已存在' }
    } catch (e) {
      ctx.body = { msg: '滚' }
    }

    try {
      const password = utils.md5(pwd);
      await ctx.model.User.create({
        phone,
        pwd: password,
      });
      ctx.body = { success: true, info: '注册成功' };
    } catch (e) {
      ctx.body = { success: false, info: '注册失败' };
      console.log(e);
    }
  }



  //activity
  async activity () {
    const { ctx, app } = this;
    let { type, page, limit } = ctx.request.body;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 20;
    const offset = (page - 1) * limit;
    const { Op } = app.Sequelize;
    const now = Date.now();
    const where = { type };
    if (type === 'end') where.eTime = { [Op.gt]: now };
    if (type === 'will') where.eTime = { [Op.lte]: now };

    const res = await ctx.model.Activity.findAndCountAll({
      where,
      limit,
      offset,
      order: [['sTime', 'DESC']],
    });

    res.rows.forEach(r => {
      r.type = app.config.actypeStr.find(item => item.value == r.type).label;
      r.sTime = new Date(r.sTime).toLocaleDateString();
    });
    ctx.body = {
      success: true,
      ...res,
    };

  }
  // 加入活动
  async joinAc () {
    const { ctx } = this;
    const { id, uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, backurl: '/login', info: '请重新登录' };
    const ac = await ctx.model.Actions.findOne({
      where: {
        uid,
        activityId: id,
      },
    });
    if (ac) return ctx.body = { success: false, info: '您已经报名，不需要重复报名' };

    try {
      await ctx.model.Actions.create({
        activityId: id,
        uid,
        type: 1,
        addTime: Date.now(),
        state: 2,
      });

      const res = await ctx.model.Activity.findOne({
        where: {
          id,
        }
      })
      await res.update({ peopleLimit: res.peopleLimit - 1 }, { where: { id, }, })
      ctx.body = { success: true, info: '成功', };
    } catch (e) {
      console.log(e)
      ctx.body = { success: false, info: '请重新登录' };
    }
  }

  async cancel () {
    const { ctx } = this;
    const { id, uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, backurl: '/login', info: '请重新登录' };
    try {
      await ctx.model.Actions.destroy({
        where: {
          id,
          uid,
        },
      })
      const res = await ctx.model.Activity.findOne({
        where: {
          id,
        }
      })
      await res.update({ peopleLimit: res.peopleLimit + 1 }, { where: { id, }, })
      ctx.body = { success: true, info: '取消成功', };
    } catch (e) {
      console.log(e)
      ctx.body = { success: true, info: '取消失败', };
    }
  }


  //book 

  async list () {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    let { page, limit, name } = ctx.request.body;

    page = page ? page : 1;
    limit = limit ? limit : 40;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) where.title = { [Op.like]: `${name}%` };
    const res = await ctx.model.Booking.findAndCountAll({
      where,
      limit,
      offset,
      raw: true,
    });
    ctx.body = { success: true, data: res };
  }

  async getOne () {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不存在' };
    const data = await ctx.model.Booking.findByPk(id);
    ctx.body = { success: true, data };
  }


  //预约场馆 
  //todo 未添加预约时间 可能会多个人请求同一时间的场馆 应在actions表加个判断
  async addBook () {
    const { ctx, app } = this;
    const { bookId, uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '请先登录', backurl: '/login' };
    await ctx.model.Actions.create({
      uid,
      state: 2,
      type: 2,
      updateTime: Date.now(),
      addTime: Date.now(),
      bookId,
      bookInfo: JSON.stringify(ctx.request.body),
    });
    ctx.body = {
      success: true,
      info: '提交申请成功',
    };
  }

  // 个人志愿者
  async single () {
    const { ctx } = this;
    const method = ctx.req.method;
    await ctx.service.common.getCommonData(); // 获取全局通用数据

    if (method === 'GET') return await ctx.render('theme/default/user/single.nj');
    try {
      const { uid } = ctx.request.body;
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
      const { uid } = ctx.request.body;
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

}

module.exports = UserController;
