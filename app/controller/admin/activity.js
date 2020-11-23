'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class UserController extends Controller {
  // @author zbx
  // @last update 2020年11月12日 10:30
  // @（新增）活动发布的接口
  // @title-活动标题 desc-活动描述 brief-简介 cover-封面 sTime-开始时间 eTime-结束时间 peopleLimit-人数限制 address-地址 addresGps-地址gps信息 author-发布人
  async addActivity() {
    const { ctx } = this;
    const { title, desc, brief, cover, sTime, eTime, peopleLimit, address, addresGps, author } = ctx.request.body;
    // 过滤数据
    if (!title) return ctx.body = { success: false, info: '请填写活动标题' };
    if (!desc) return ctx.body = { success: false, info: '请填写活动描述' };
    // if (!brief) return  ctx.body = { success: false, info: '请填写简介' };
    // if (!cover) return  ctx.body = { success: false, info: '请上传封面' };
    // if (!sTime) return  ctx.body = { success: false, info: '请填写开始时间' };
    // if (!eTime) return  ctx.body = { success: false, info: '请填写结束时间' };
    if (!peopleLimit) return ctx.body = { success: false, info: '请填写人数限制' };
    if (!address) return ctx.body = { success: false, info: '请填写地址' };
    if (!addresGps) return ctx.body = { success: false, info: '请定位地址gps信息' };
    if (!author) return ctx.body = { success: false, info: '请填写发布人' };
    try {
      await ctx.model.Activity.create({
        title, // 活动标题
        desc, // 活动描述
        brief, // 简介
        cover, // 封面
        sTime, // 开始时间
        eTime, // 结束时间
        peopleLimit, // 人数限制
        address, // 地址
        addresGps, // 地址gps信息  bmap {lat,lng}
        author, // 发布人
        addTime: Date.now(), // 发布时间
      });
      ctx.body = { success: true, info: '活动发布成功' };
    } catch (e) {
      ctx.body = { success: false, info: '活动发布失败' };
      console.log(e);
    }
  }

  // @author zbx
  // @last update 2020年11月12日 10:45
  // @(删除)活动发布的接口
  // @id-用户id
  async delActivity() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Activity.update({
        isDelete: 1,
      },
      {
        where: {
          id,
        },
      });
      ctx.body = { success: true, msg: '删除成功' };
    } catch (e) {
      console.log(e);
    }
  }

  // @author zbx
  // @last update 2020年11月12日 11:25
  // @（编辑）活动发布的接口
  // @title-活动标题 desc-活动描述 brief-简介 cover-封面 sTime-开始时间 eTime-结束时间 peopleLimit-人数限制 address-地址 addresGps-地址gps信息 author-发布人 id
  async editActivity() {
    const { ctx } = this;
    const { title, desc, brief, cover, sTime, eTime, peopleLimit, address, addresGps, author, id } = ctx.request.body;
    const update = {};
    if (title) update.title = title;
    if (desc) update.desc = desc;
    if (brief) update.brief = brief;
    if (cover) update.cover = cover;
    if (sTime) update.sTime = sTime;
    if (eTime) update.eTime = eTime;
    if (peopleLimit) update.peopleLimit = peopleLimit;
    if (address) update.address = address;
    if (addresGps) update.addresGps = addresGps;
    if (author) update.author = author;
    if (!id) return ctx.body = { success: false, msg: '该活动不存在' };
    try {
      const res = await ctx.model.Activity.update(
        update,
        {
          where: {
            id,
          },
        }
      );
      ctx.body = { success: true, data: res, info: '修改成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '修改失败' };
    }
  }

  // @author zbx
  // @last update 2020年11月12日 11:35
  // @（查询全部）活动发布的接口 但把字段isDalete为1的数据过滤不返回 （也可以通过查询活动标题查到对应的活动）
  // @title-活动标题
  async findActivity() {
    const { ctx, app } = this;
    let { title, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (title) where.title = { [Op.like]: '%' + title + '%' };
    limit = limit ? limit : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Activity.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
    }
  }

  // @author zbx
  // @last update 2020年11月12日 11:50
  // @通过id号获取对应id的活动信息详情接口
  async findOneActivity() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不正确' };
    try {
      const res = await ctx.model.Activity.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该活动id不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }
}

module.exports = UserController;
