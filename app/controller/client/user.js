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


  // 首页数据
  // 最近一周用户注册数
  async findweekusers (){
    const { ctx } = this;
    const { Op } = require('sequelize');
    const timestamp =
            new Date(
                    new Date(new Date().toLocaleDateString()).getTime() -
                    7 * 24 * 3600 * 1000
            ).getTime()
    // 今天零点的时间戳
    const today =
            new Date(
                    new Date(new Date().toLocaleDateString()).getTime() - 8 * 3600 * 1000
            ).getTime()
    // 昨天零点的时间戳
    const yestoday = today - 24 * 3600 * 1000
    try {
      // 查询总用户数
      const totalusers = await ctx.model.User.count({})
      // 查询总文章数
      const totalarticles = await ctx.model.Article.count({})
      // 查询总活动数
      const totalactivities = await ctx.model.Activity.count({})
      // 查询最近一周的用户注册数
      const lastweekusers = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: timestamp,
            [Op.lte]: Date.now(),
          }
        }
      })

      // 查询昨日的用户注册数
      const yesterdayuser = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: yestoday,
            [Op.lte]: today,
          }
        }
      })
      // 查询今天的用户注册数
      const todayusers = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: today,
            [Op.lte]: Date.now(),
          }
        }
      })
      // 查询今天的用户注册数
      const yesterdayarticles = await ctx.model.Article.count({
        where: {
          addTime: {
            [Op.gte]: today,
            [Op.lte]: Date.now(),
          }
        }
      })
      // 查询今日文章注册数
      const todayarticle = await ctx.model.Article.count({
        where: {
          addTime: {
            [Op.gte]: today,
            [Op.lte]: Date.now(),
          }
        }
      })
      ctx.body = { success: true,totalusers,totalarticles,totalactivities,lastweekusers,yesterdayuser,todayusers,yesterdayarticles,todayarticle};
    } catch (e) {
      console.log(e)
    }
  }

  // 用户访问文章记录ip


}

module.exports = UserController;
