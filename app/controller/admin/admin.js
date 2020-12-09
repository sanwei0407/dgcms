'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;
const pinyin4js = require('pinyin4js');

class AdminController extends Controller {
  // @author zbx
  // @last update 2020年11月10日 16:15
  // @管理员注册（增加）的接口
  // userName-用户名 pwd-用户密码 addTime-注册时间 groupId-用户组id phone-用户手机号码 smscode-验证码
  async addAdmin() {
    const { ctx, app } = this;
    const { userName, pwd, groupId, phone } = ctx.request.body;
    console.log(ctx.request.body);
    const { Op } = app.Sequelize;
    // 过滤数据
    if (!(userName && pwd && groupId)) {
      ctx.body = { success: false, info: '请填写完整信息' };
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }
    // 账号信息的过滤（查看是否已注册）
    try {
      const res = await ctx.model.Admin.findAll({
        where: {
          [Op.or]:
          [
            { phone },
            { userName },
          ],
        },
      });
      if (res[0]) {
        ctx.body = { success: false, msg: '该账户已注册' };
        return;
      }
      const password = utils.md5(pwd);
      try {
        await ctx.model.Admin.create({
          userName, // 用户名
          phone, // 手机号码
          pwd: password, // 密码
          groupId, // 用户组id
          addTime: Date.now(), // 注册时间
        });
        ctx.body = { success: true, info: '添加成功' };
        // await app.redis.del(phone);
      } catch (e) {
        ctx.body = { success: false, info: '添加失败' };
        console.log(e);
      }
    } catch (e) {
      ctx.body = { success: false, info: '添加失败2' };
      console.log('123', e);
      return;
    }

  }


  // @author Martin
  // @last update 2020年11月10日14:33:27
  // @管理员登录
  // userName-用户名 pwd-密码  pwdd-MD5加密后的密码
  // async loginAdmin() {
  //   const { ctx, app } = this;
  //   const { Op } = app.Sequelize;
  //   const {
  //     userName,
  //     pwd,
  //   } = ctx.request.body;
  //   const pwdd = utils.md5(pwd);
  //   console.log(pwdd);
  //   try {
  //     const res = await ctx.model.Admin.findOne({
  //       where: {
  //         userName,
  //       },
  //     });
  //     if (pwdd === res.pwd) { // 密码正确
  //       const groupId = res.groupId;
  //       // 登录后--可以获取到用户的groupId--通过groupId获取到对应的roles--从而知道该用户可以访问的路径
  //       const groupRole = await ctx.model.Group.findByPk(groupId, { raw: true });
  //       // 通过roles去获取对应可访问的路径
  //
  //       const _arr = groupRole.roles.split(',');
  //       const _arry = await ctx.model.Role.findAll({ where: {
  //         id: {
  //           [Op.in]: _arr.map(r => parseInt(r)),
  //         },
  //       },
  //       raw: true,
  //       });
  //       const _menu = _arry.map(r => ({ ...r, title: r.name, name: pinyin4js.convertToPinyinString(r.name, '', pinyin4js.WITHOUT_TONE) }));
  //       for (const item of _menu) {
  //         if (item.pid > 0) {
  //           const parent = _menu.find(r => r.id === item.pid); // 找（父亲）等于pid的id
  //           console.log('90909', parent);
  //           // if (parent.children) {
  //           //   parent.children.filter(r => r.action === '' || r.action === null);
  //           // }
  //           // console.log('zbx', zbx);
  //           if (parent) {
  //             if (!parent.children) {
  //               parent.children = [];
  //               parent.children.push(item);
  //             }
  //             // if (parent.children.action !== '' || parent.children.action !== null) {
  //             //   parent.children = [];
  //             //   parent.children.push(item);
  //             // }
  //           }
  //         }
  //       }
  //       const TreeDate = _menu.filter(r => r.pid === 1);
  //       console.log('菜单对应的路径：', TreeDate);
  //       ctx.body = {
  //         success: true,
  //         msg: '登录成功',
  //         data: {
  //           userName: res.userName,
  //           groupId: res.groupId,
  //           TreeDate,
  //         },
  //       };
  //     }
  //     if (pwdd !== res.pwd) { // 密码错误
  //       ctx.body = {
  //         success: false,
  //         msg: '密码错误',
  //       };
  //     }
  //   } catch (e) {
  //     ctx.body = {
  //       success: false,
  //       msg: '用户名不存在' + e,
  //     };
  //     console.log('error!!!' + e);// 输出报错
  //   }
  // }
  async loginAdmin() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const {
      userName,
      pwd,
    } = ctx.request.body;
    const pwdd = utils.md5(pwd);
    try {
      const res = await ctx.model.Admin.findOne({
        where: {
          userName,
        },
      });
      if (pwdd === res.pwd) { // 密码正确
        const groupId = res.groupId;
        // 登录后--可以获取到用户的groupId--通过groupId获取到对应的roles--从而知道该用户可以访问的路径
        const groupRole = await ctx.model.Group.findByPk(groupId, { raw: true });
        // 通过roles去获取对应可访问的路径

        const _arr = groupRole.roles.split(',');
        const _arry = await ctx.model.Role.findAll({ where: {
          id: {
            [Op.in]: _arr.map(r => parseInt(r)),
          },
        },
        raw: true,
        });
        let _temp = _arry.map(r => ({ ...r, title: r.name, name: pinyin4js.convertToPinyinString(r.name, '', pinyin4js.WITHOUT_TONE) }));
        _temp = _temp.filter(r => r.path);
        const _menu = _temp.filter(r => r.action === '' || r.action === null);
        for (const item of _menu) {
          if (item.pid > 0) {
            const parent = _menu.find(r => r.id === item.pid); // 找（父亲）等于pid的id
            if (parent) {
              if (!parent.children) parent.children = [];
              parent.children.push(item);
            }
          }
        }
        const TreeDate = _menu.filter(r => r.pid === 1);
        // console.log('菜单对应的路径：', TreeDate);
        ctx.body = {
          success: true,
          msg: '登录成功',
          data: {
            userName: res.userName,
            groupId: res.groupId,
            TreeDate,
          },
        };
      }
      if (pwdd !== res.pwd) { // 密码错误
        ctx.body = {
          success: false,
          msg: '密码错误',
        };
      }
    } catch (e) {
      ctx.body = {
        success: false,
        msg: '用户名不存在' + e,
      };
      console.log('error!!!' + e);// 输出报错
    }
  }

  // @author Martin
  // @last update 2020年11月13日08:45:14
  // @管理员删除的接口
  async delAdmin() {
    const { ctx } = this;
    const {
      aid,
    } = ctx.request.body;
    try {
      await ctx.model.Admin.destroy({
        where: {
          aid,
        },
      });
      ctx.body = { success: true, msg: '删除成功' };
    } catch (e) {
      console.log(e);
    }

  }

  // @author undefined(罗铿）
  // @lastUpdata 2020.11.10 14:44
  // @管理员修改（编辑）密码
  // @userName 用户名 pwd 密码 phone 手机号码
  async editAdmin() {
    const { ctx } = this;
    const { aid, userName, pwd, phone } = ctx.request.body;
    const update = {};
    if (userName) update.username = userName;
    if (pwd) update.pwd = utils.md5(pwd);
    if (phone) update.phone = phone;
    // 数据过滤
    if (!phone) return ctx.body = { success: false, info: '手机号未填写' };
    if (!pwd) return ctx.body = { success: false, info: '密码未填写' };
    // 手机号码检验
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      ctx.body = { success: false, info: '请输入正确的手机号' };
      return;
    }

    try {
      const res = await ctx.model.Admin.findOne({
        where: {
          phone,
        },
      }
      );
      console.log('1111', res);
      res.update(
        update,
        {
          where: {
            aid,
          },
        }
      );
      ctx.body = { success: true, msg: '修改成功', update };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: '修改失败了', e };
    }
  }

  // @author zbx
  // @last update 2020年11月25日 14:04
  // @管理员查询的接口
  async findAdmin() {
    const { ctx, app } = this;
    let { userName, phone, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (userName) where.userName = { [Op.like]: '%' + userName + '%' };
    if (phone) where.phone = { [Op.like]: '%' + phone + '%' };

    limit = limit ? limit : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Admin.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'pwd' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author zbx
  // @last update 2020年11月10日 16:45
  // 发送短信验证码
  // 暂时用不到
  async smscode() {
    const { ctx, app } = this;
    const { phone } = ctx.request.body;
    console.log(phone);
    try {
      console.log(app.redis);
      const codeTemp = await app.redis.get(phone);
      if (!codeTemp) {
        // 判断redis中有没有code
        let code = '';
        const codeLength = 6; // 验证码的长度
        const selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        // 所有候选组成验证码的字符，当然也可以用中文的
        for (let i = 0; i < codeLength; i++) {
          const charIndex = Math.floor(Math.random() * 10);
          code += selectChar[charIndex];
        }
        await app.redis.set(phone, code, 'EX', 60000);
        console.log('手机：', phone);
        console.log('验证码：', code);
        await this.ctx.sms.sendSMS({
          PhoneNumbers: phone,
          SignName: '冬瓜木头鸭',
          TemplateCode: 'SMS_205448600',
          TemplateParam: `{ "code" : "${code}"}`,
        });
        ctx.body = { success: true, info: '发送成功' };
      } else {
        const code = await app.redis.get(phone);
        await this.ctx.sms.sendSMS({
          PhoneNumbers: phone,
          SignName: '冬瓜木头鸭',
          TemplateCode: 'SMS_205448600',
          TemplateParam: `{ "code" : "${code}"}`,
        });
        ctx.body = { success: true, info: '发送成功' };
      }
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '发送失败' };
    }

  }

  // @author zbx
  // @last update 2020年11月10日 16:45
  // 校验短信验证码
  // 暂时用不到
  async checkSms() {
    const { ctx, app } = this;
    const { phone, code } = ctx.request.body;
    try {
      const codeTemp = await app.redis.get(phone);
      if (code === codeTemp) {
        ctx.body = { success: true, info: '验证码正确' };
      } else {
        ctx.body = { success: false, info: '验证码不正确' };
      }
    } catch (e) {
      ctx.body = { success: false, info: '验证码不正确' };
    }
  }


}

module.exports = AdminController;
