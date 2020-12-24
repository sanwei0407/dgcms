'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class ArticleController extends Controller {

  // @author Martin
  // @last update 2020年11月11日10:53:56
  // @发布文章
  // title-标题 content-内容 author-作者 cover-封面 from-来源 cid-栏目id top-是否置顶 addTime-发布时间
  // tag-标签，文章标题的关键字(方便搜索到该文章) isHot-是否热门 contenSummary-内容摘要 whoCanRead-文章谁可见
  async addArt() {
    const {
      ctx,
    } = this;
    const {
      title,
      content,
      author,
      cover,
      from,
      cid,
      top,
      tag,
      isHot,
      pdf,
      contentSummary,
      whoCanRead,
      reading,
      type,
    } = ctx.request.body;
    if (!title) return ctx.body = { success: false, msg: '请输入标题!' };
    if (!content) return ctx.body = { success: false, msg: '请输入内容!' };
    // if (!cover) return ctx.body = { success: false, msg: '请输入封面地址' };
    if (!cid) return ctx.body = { success: false, msg: '请输入文章栏目' };

    try {
      await ctx.model.Article.create({
        title,
        content,
        author: author ? author : '匿名', // 如果没写作者则返回匿名
        addTime: Date.now(),
        cover,
        from,
        cid,
        isHot: isHot ? isHot : 0,
        top: top ? top : 0,
        tag, // 标签--文章标题的关键字(方便搜索到该文章)
        contentSummary: contentSummary ? contentSummary : content.substring(3, content.lastIndexOf('<')).substring(0, 120), // 如果没有内容摘要 选取内容的前120个字
        whoCanRead,
        reading,
        state: 1,
        uid: 0,
        pdf,
        type,
      });
      ctx.body = {
        success: true,
        msg: '发布文章成功!',
      };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: '发布文章失败' };
    }
  }

  // @author Martin
  // @last update 2020年11月11日11:33:27
  // @删除文章
  // aid-文章id  isDelete-是否删除
  async delArt() {
    const {
      ctx,
    } = this;
    const {
      aid,
    } = ctx.request.body;
    try {
      await ctx.model.Article.update({
        isDelete: 1,
      },
      {
        where: {
          aid,
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
  // @last update 2020年11月11日15:33:27
  // @查找文章
  // aid-文章id  isDelete-是否删除  title-标题 content-内容 author-作者 from-来源 cid-分栏id page-页码 limit-限制条数

  async findArtList() {

    const { ctx, app } = this;
    let { title,
      content,
      author,
      from,
      cid,
      contentSummary,
      page,
      limit,
      whoCanRead,
      reading,
    } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (title) where.title = { [Op.like]: title + '%' };
    if (content) where.content = { [Op.like]: content + '%' };
    if (author) where.author = { [Op.like]: author + '%' };
    if (from) where.from = { [Op.like]: from + '%' };
    if (cid) where.cid = { [Op.like]: cid + '%' };
    if (contentSummary) where.contentSummary = { [Op.like]: contentSummary + '%' };
    if (whoCanRead) where.whoCanRead = { [Op.like]: whoCanRead + '%' };
    if (reading) where.reading = { [Op.like]: reading + '%' };

    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      await ctx.model.Article.belongsTo(ctx.model.Category, { targetKey: 'cid', foreignKey: 'cid' });
      const res = await ctx.model.Article.findAndCountAll({
        where,
        limit,
        offset,
        order: [[ 'top', 'DESC' ], [ 'aid', 'DESC' ]],
        attributes: {
          exclude: [ 'isDelete' ],
        },
        include: [
          {
            model: ctx.model.Category,
          },
        ],
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
    }
  }

  // @author Martin
  // @last update 2020年11月11日16:33:27
  // @查找文章(对单个文章进行编辑时使用)
  // aid-文章id
  async findOneArt() {
    const { ctx } = this;
    const { aid } = ctx.request.body;
    if (!aid) return ctx.body = { success: false, info: '该文章不存在' };
    try {
      await ctx.model.Article.belongsTo(ctx.model.Category, { foreignKey: 'cid' });
      const res = await ctx.model.Article.findByPk(aid, {
        include: [ ctx.model.Category ],
      });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该文章不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }

  // @author Martin
  // @last update 2020年11月20日09:27:01
  // @查找文章(对单个文章进行编辑时使用)
  // aid-文章id title-标题 content-内容 author-作者 from-来源 cid-分栏id top-是否置顶
  async reviceArt() {
    const { ctx } = this;
    const {
      aid,
      title,
      content,
      author,
      from,
      cid,
      top,
      tag,
      isHot,
      contentSummary,
      whoCanRead,
      reading,
      type,
    } = ctx.request.body;
    const update = { updateTime: Date.now() };
    if (title) update.title = title;
    if (content) update.content = content;
    if (author) update.author = author;
    if (from) update.from = from;
    if (cid) update.cid = cid;
    if (top) update.top = top;
    if (tag) update.tag = tag;
    if (isHot) update.isHot = isHot;
    if (contentSummary) update.contentSummary = contentSummary;
    if (whoCanRead) update.whoCanReal = whoCanRead;
    if (reading) update.reading = reading;
    if (type) update.type = type;
    if (!aid) return ctx.body = { success: false, msg: '该文章不存在' };
    try {
      const res = await ctx.model.Article.update(
        update,
        {
          where: {
            aid,
          },
        }
      );
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

module.exports = ArticleController;
