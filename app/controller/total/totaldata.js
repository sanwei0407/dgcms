'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库

class TotaldataController extends Controller {

  // 查询总用户数
  async findAlltotaData() {

  }
  // 创建数据
  async addtotaData() {
    const { ctx } = this;
    const { Op } = require("sequelize");
    // 一周前的零点时间戳
    const timestamp =
      new Date(
        new Date(new Date().toLocaleDateString()).getTime() -
        7 * 16 * 3600 * 1000
      ).getTime()
    // 今天零点的时间戳
    const today =
      new Date(
        new Date(new Date().toLocaleDateString()).getTime() - 8 * 3600 * 1000
      ).getTime()
    // 昨天零点的时间戳
    const yestoday = today - 24 * 3600 * 1000
    let totalusers = 0;
    let totalarticles = 0;
    let totalactivities = 0;
    let lastweekusers = 0;
    let yesterdayuser = 0;
    let todayusers = 0;
    let yesterdayarticles = 0;
    let todayarticle = 0;
    // 查询总用户数
    try {
      totalusers = await ctx.model.User.count({})
    } catch (e) {
      console.log(e)
    }
    // 查询总文章数
    try {
      totalarticles = await ctx.model.Article.count({})
    } catch (e) {
      console.log(e)
    }
    // 查询总活动数
    try {
      totalactivities = await ctx.model.Activity.count({})
    } catch (e) {
      console.log(e)
    }
    // 查询最近一周的用户注册数
    try {
      lastweekusers = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: timestamp,
            [Op.lte]: Date.now(),
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
    // 查询昨日用户注册数 
    try {
      yesterdayuser = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: yestoday,
            [Op.lte]: today,
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
    // 查询今日注册数
    try {
      todayusers = await ctx.model.User.count({
        where: {
          addTime: {
            [Op.gte]: today,
            [Op.lte]: Date.now(),
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
    // 查询昨日文章注册数 
    try {
      yesterdayarticles = await ctx.model.Article.count({
        where: {
          addTime: {
            [Op.gte]: yestoday,
            [Op.lte]: today,
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
    // 查询今日文章注册数
    try {
      todayarticle = await ctx.model.Article.count({
        where: {
          addTime: {
            [Op.gte]: today,
            [Op.lte]: Date.now(),
          }
        }
      })
    } catch (e) {
      console.log(e)
    }
    // 创建数据汇总
    try {
      await ctx.model.Totaldata.create({
        totalusers,
        totalarticles,
        totalactivities,
        lastweekusers,
        yesterdayuser,
        todayusers,
        yesterdayarticles,
        todayarticle
      })
      ctx.body = {success:true,info:'创建成功！'}
    } catch (e) {
      console.log(e)
    }
    console.log(totalusers,totalarticles,totalactivities,lastweekusers,yesterdayuser)
  }
}
module.exports = TotaldataController;

