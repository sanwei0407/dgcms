'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class VoteController extends Controller {

  // @author Martin
  // @last update 2020年11月12日9:43:56
  // @发起投票
  // title-标题 cover-封面 desc-内容说明 sTime-开始时间 eTime-结束时间 author-作者 perLimit-每个人投票限制 addTime-发布时间
  async addVote() {
    const {
      ctx,
    } = this;
    const {
      title,
      desc,
      author,
      cover,
      eTime,
      sTime,
      perLimit,
    } = ctx.request.body;
    // if (!title) return ctx.body = { success: false, msg: '请输入标题!' };
    // if (!desc) return ctx.body = { success: false, msg: '请输入内容说明!' };
    // if (!author) return ctx.body = { success: false, msg: '请输入作者!' };
    // if (!cover) return ctx.body = { success: false, msg: '请输入封面地址' };
    // if (!sTime) return ctx.body = { success: false, msg: '请输入开始时间' };
    // if (!eTime) return ctx.body = { success: false, msg: '请输入结束时间' };
    // if (!perLimit) return ctx.body = { success: false, msg: '请输入每个人的投票限制' };
    try {
      const res = await ctx.model.Vote.create({
        title,
        desc,
        author,
        cover,
        eTime,
        sTime,
        perLimit,
        addTime: Date.now(),
      });
      const id = res.id;
      ctx.body = {
        success: true,
        msg: '发布投票成功!',
        id,
      };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: '发起投票失败', e };
    }

  }

  // @author Martin
  // @last update 2020年11月12日10:20:27
  // @删除投票
  // id-投票id  isDelete-是否删除
  async delVote() {
    const {
      ctx,
    } = this;
    const {
      id,
    } = ctx.request.body;
    try {
      await ctx.model.Vote.update({
        isDelete: 1,
      },
      {
        where: {
          id,
        },
      });
      ctx.body = {
        success: true,
        msg: '删除成功',
      };
    } catch (e) {
      console.log(e);
    }


  }

  // @author Martin
  // @last update 2020年11月18日08:53:59
  // @查找投票
  // isDelete-是否删除  title-标题 desc-内容说明 author-作者  page:分页 limit:每页限制的条数
  async findVoteList() {
    const { ctx, app } = this;
    let {
      title,
      desc,
      author,
      limit,
      page,
    } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (title) where.title = { [Op.like]: title + '%' };
    if (desc) where.desc = { [Op.like]: desc + '%' };
    if (author) where.author = { [Op.like]: author + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Vote.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'isDelete' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
    }
  }

  // @author Martin
  // @last update 2020年11月18日08:59:18
  // @查找文章(对单个文章进行编辑时使用)
  // aid-文章id
  async findOneVote() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '该投票不存在' };
    try {
      const res = await ctx.model.Vote.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该投票不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }
  // @author Martin
  // @last update 2020年11月18日08:59:24
  // @查找文章(对单个文章进行编辑时使用)
  // aid-文章id title-标题 content-内容 author-作者 from-来源 cid-分栏id top-是否置顶
  async reviceVote() {
    const { ctx } = this;
    const {
      id,
      title,
      desc,
      author,
      sTime,
      eTime,
      perLimit,
    } = ctx.request.body;
    const update = { updateTime: Date.now() };
    if (title) update.title = title;
    if (desc) update.desc = desc;
    if (author) update.author = author;
    if (sTime) update.sTime = sTime;
    if (eTime) update.eTime = eTime;
    if (perLimit) update.perLimit = perLimit;
    if (!id) return ctx.body = { success: false, msg: '该投票不存在' };
    try {
      const res = await ctx.model.Vote.update(
        update,
        {
          where: {
            id,
          },
        });
      ctx.body = { success: true, msg: '修改成功', data: res };

    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        msg: '修改失败',
      };
    }
  }
}

module.exports = VoteController;
