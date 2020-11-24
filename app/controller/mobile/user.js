// 'use strict';
// const utils = require('utility'); // 引入一个工具库
// const Controller = require('egg').Controller;
//
//
// class HomeController extends Controller {
//   // @author zbx
//   // @last update 2020年11月10日 16:45
//   // 发送短信验证码
//   // 暂时用不到
//   async smscode() {
//     const { ctx, app } = this;
//     const { phone } = ctx.request.body;
//     console.log(phone);
//     try {
//       console.log(app.redis);
//       const codeTemp = await app.redis.get(phone);
//       if (!codeTemp) {
//         // 判断redis中有没有code
//         let code = '';
//         const codeLength = 6; // 验证码的长度
//         const selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);
//         // 所有候选组成验证码的字符，当然也可以用中文的
//         for (let i = 0; i < codeLength; i++) {
//           const charIndex = Math.floor(Math.random() * 10);
//           code += selectChar[charIndex];
//         }
//         await app.redis.set(phone, code, 'EX', 60000);
//         console.log('手机：', phone);
//         console.log('验证码：', code);
//         await this.ctx.sms.sendSMS({
//           PhoneNumbers: phone,
//           SignName: '冬瓜木头鸭',
//           TemplateCode: 'SMS_205448600',
//           TemplateParam: `{ "code" : "${code}"}`,
//         });
//         ctx.body = { success: true, info: '发送成功' };
//       } else {
//         const code = await app.redis.get(phone);
//         await this.ctx.sms.sendSMS({
//           PhoneNumbers: phone,
//           SignName: '冬瓜木头鸭',
//           TemplateCode: 'SMS_205448600',
//           TemplateParam: `{ "code" : "${code}"}`,
//         });
//         ctx.body = { success: true, info: '发送成功' };
//       }
//     } catch (e) {
//       console.log(e);
//       ctx.body = { success: false, info: '发送失败' };
//     }
//
//   }
//
//   // @author zbx
//   // @last update 2020年11月10日 16:45
//   // 校验短信验证码
//   // 暂时用不到
//   async checkSms() {
//     const { ctx, app } = this;
//     const { phone, code } = ctx.request.body;
//     try {
//       const codeTemp = await app.redis.get(phone);
//       if (code === codeTemp) {
//         ctx.body = { success: true, info: '验证码正确' };
//       } else {
//         ctx.body = { success: false, info: '验证码不正确' };
//       }
//     } catch (e) {
//       ctx.body = { success: false, info: '验证码不正确' };
//     }
//   }
//
//   // @author Martin
//   // @last update 2020年11月10日14:33:27
//   // @用户登录
//   async login() {
//     const { ctx } = this;
//     const {
//       userName,
//       pwd,
//     } = ctx.request.body;
//     const pwdd = utils.md5(pwd);
//     console.log(pwdd);
//     try {
//       const res = await ctx.model.Admin.findOne({
//         where: {
//           userName,
//         },
//       });
//       if (pwdd === res.pwd) { // 密码正确
//         ctx.body = {
//           success: true,
//           msg: '登录成功',
//           data: {
//             userName: res.userName,
//             groupId: res.groupId,
//           },
//         };
//       }
//       if (pwdd !== res.pwd) { // 密码错误
//         ctx.body = {
//           success: false,
//           msg: '密码错误',
//         };
//       }
//     } catch (e) {
//       ctx.body = {
//         success: false,
//         msg: '用户名不存在' + e,
//       };
//       console.log('error!!!' + e);// 输出报错
//     }
//   }
//   // @author undefined(罗铿）
//   // @lastUpdata 2020.11.10 14:44
//   // @用户修改密码
//   // @userName 用户名 pwd 密码 phone 手机号码
//   async aditUser() {
//     const { ctx } = this;
//     const { aid, userName, pwd, phone } = ctx.request.body;
//     const update = {};
//     if (userName) update.username = userName;
//     if (pwd) update.pwd = utils.md5(pwd);
//     if (phone) update.phone = phone;
//     // 数据过滤
//     if (!phone) return ctx.body = { success: false, info: '手机号未填写' };
//     if (!pwd) return ctx.body = { success: false, info: '密码未填写' };
//     // 手机号码检验
//     if (!(/^1[3456789]\d{9}$/.test(phone))) {
//       ctx.body = { success: false, info: '请输入正确的手机号' };
//       return;
//     }
//
//     try {
//       const res = await ctx.model.Admin.findOne({
//         where: {
//           phone,
//         },
//       }
//       );
//       console.log('1111', res);
//       res.update(
//         update,
//         {
//           where: {
//             aid,
//           },
//         }
//       );
//       ctx.body = { success: true, msg: '修改成功', update };
//     } catch (e) {
//       console.log(e);
//       ctx.body = { success: false, msg: '修改失败了', e };
//     }
//   }
//
//
// }
//
// module.exports = HomeController;
