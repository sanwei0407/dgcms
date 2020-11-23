'use strict';
const Controller = require('egg').Controller;
class BookController extends Controller {
  // @author undefined
  // @last update 2020年11月12日 11:27
  // 添加栏目接口
  // title-标题 desc-预约描述 sTime-开始时间 eTime-结束时间 brief-简介 author-发布作者 addTime-发布时间 peopleLimit-预约人数 type-预约类型
  async addbook() {
    const { ctx } = this;
    const { title, desc, sTime, eTime, brief, author, addTime, peopleLimit, type } = ctx.request.body;
    if (!title) return ctx.body = { success: false, info: '请填写标题' };
    if (!sTime) return ctx.body = { success: false, info: '请填写开始时间' };
    if (!eTime) return ctx.body = { success: false, info: '请填写结束时间' };
    if (!author) return ctx.body = { success: false, info: '请填写发布作者' };
    if (!peopleLimit) return ctx.body = { success: false, info: '请填写预约人数' };
    if (!type) return ctx.body = { success: false, info: '请填写预约类型' };
    try {
      await ctx.model.Book.create({
        title, // 标题
        desc, // 预约描述
        sTime, // 开始时间
        eTime, // 结束时间
        brief, // 简介
        author, // 发布作者
        addTime, // 发布时间
        peopleLimit, // 预约人数
        type, // 预约类型
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败', e };
    }

  }

  async delbook() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '请输入ID' };
    try {
      await ctx.model.Book.update(
        {
          isdelete: 1,
        },
        {
          where: {
            id,
          },
        });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  async findOneBook() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '该预约不存在' };
    try {
      const res = await ctx.model.Book.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该预约不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }

  async findAllBook() {
    const { ctx, app } = this;
    let { title, desc, sTime, eTime, brief, author, addTime, peopleLimit, type, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isdelete: 0 };
    if (title) where.title = { [Op.like]: '%' + title + '%' };
    if (desc) where.desc = { [Op.like]: '%' + desc + '%' };
    if (author) where.author = { [Op.like]: '%' + author + '%' };
    if (sTime) where.sTime = { [Op.like]: '%' + sTime + '%' };
    if (eTime) where.eTime = { [Op.like]: '%' + eTime + '%' };
    if (brief) where.brief = { [Op.like]: '%' + brief + '%' };
    if (addTime) where.addTime = { [Op.like]: '%' + addTime + '%' };
    if (peopleLimit) where.peopleLimit = { [Op.like]: '%' + peopleLimit + '%' };
    if (type) where.type = { [Op.like]: '%' + type + '%' };

    limit = limit ? limit : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Book.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'isdelete' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
    }
  }

  async editBook() {
    const { ctx } = this;
    const { title, desc, sTime, eTime, brief, author, addTime, peopleLimit, type, id } = ctx.request.body;
    const update = {};
    if (title) update.title = title;
    if (desc) update.desc = desc;
    if (author) update.author = author;
    if (sTime) update.sTime = sTime;
    if (eTime) update.eTime = eTime;
    if (brief) update.brief = brief;
    if (addTime) update.addTime = addTime;
    if (peopleLimit) update.peopleLimit = peopleLimit;
    if (type) update.type = type;
    if (!id) return ctx.body = { success: false, info: '无该id或者未输入id' };
    try {
      const res = await ctx.model.Book.update(update, {
        where: {
          id,
        },
        attributes: {
          exclude: [ 'isdelete' ],
        },
      });
      ctx.body = { success: true, info: '修改成功', res };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败', e };
    }
  }
}
module.exports = BookController;
