'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');// 引入node的文件处理模块
const path = require('path'); // 引入node的路径处理模块
const filePath = path.resolve('./dist'); // 调用文件遍历方法
const dirTree = require('directory-tree');

class CommonController extends Controller {

  // node读取文件夹中的文件信息
  getAllzbx() {
    const { app, ctx } = this;
    console.log('123123123');
    console.log(app.baseDir);
    try {
      // const tree = dirTree(app.baseDir+`/app/view`); // 方法1获取路径
      const tree = dirTree('/app/view'); // 方法2获取路径
      console.log(tree);
      ctx.body = tree;
    } catch (e) {
      console.log(e);
    }

  }

  // 参考例子-模版-栏目-主题色
  async abc() {
    const { ctx } = this;
    console.log('reqis', ctx.req);
    let templateDir;
    // 拿到path
    const path = ctx.req.url.split('/');
    if (path.length === 2) {
      // 说明是列表页 //   /kfc  ['','kfc']
      // 查询是哪个栏目
      const cate = await ctx.model.Category.findOne({
        where: {
          seoUrl: '/' + path[1],
        },
        raw: true,
      });

      // 查询该栏目使用哪个模板

      const _template = await ctx.model.Template.findByPk(cate.templateId);

      // 查询当前使用的是什么的主题  defaut
      const curTheme = 'default';
      templateDir = `/theme/${curTheme}/${_template.path}`;


      // 获取模板要使用到的数据


    }
    if (path.length === 3) {
      // 说明是内容页   ///     /kfc/34343  ['','kfc','34343']
    }
    await ctx.render(templateDir, {});

  }

  async getpushinfo() {
    const { ctx } = this;
    const { type, id } = ctx.request.body;
    const where = {};
    if (type) where.type = type;
    // 1 = 文章
    // 2 = 活动
    // 3 = 预定
    if (type == 1) where.articleId = id;
    if (type == 2) where.activityId = id;
    if (type == 3) where.bookId = id;

    const res = await ctx.model.Push.findOne({
      where,
    });
    ctx.body = {
      success: true,
      data: res,
    };
  }

  async addPush() {
    const { ctx } = this;
    let { placeInfo, order, id, platform, type } = ctx.request.body;
    const inserData = {};
    type = type || 1;
    if (type == 1) inserData.articleId = id;
    if (type == 2) inserData.activityId = id;
    if (type == 3) inserData.bookId = id;

    platform = platform || 1;
    order = order || 1;
    const place = placeInfo;

    try {
      await ctx.model.Push.create({
        type,
        platform,
        order,
        place,
        ...inserData,
      });
      ctx.body = { success: true, info: 'ok' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '添加推送失败' };
    }
  }

  async pushList() {
    const { ctx } = this;
    let { platform, type, place, page, limit } = ctx.request.body;

    limit = limit || 10;
    page = page || 1;
    type = type || 1;
    const offset = limit * (page - 1);
    const where = {};
    if (type) where.type = type;
    if (place) where.place = place;
    if (platform) where.platform = platform;
    const { Push, Article, Booking, Activity } = ctx.model;
    let include = {};
    await ctx.model.Push.belongsTo(Article, { foreignKey: 'articleId', targetKey: 'aid' });
    await ctx.model.Push.belongsTo(Activity, { foreignKey: 'activityId', targetKey: 'id' });
    await ctx.model.Push.belongsTo(Booking, { foreignKey: 'bookId', targetKey: 'id' });

    if (type == 1) include = { model: Article, require: true };
    if (type == 2) include = { model: Activity, require: true };
    if (type == 3) include = { model: Booking, require: true };

    try {
      const res = await ctx.model.Push.findAndCountAll({
        where,
        limit,
        offset,
        include,
        order: [[ 'order', 'DESC' ], [ 'id', 'DESC' ]],
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      console.log('e', e);
      ctx.body = { success: false };
    }

  }

  async editPush() {
    const { ctx } = this;
    const { id, order } = ctx.request.body;
    try {
      await ctx.model.Push.update({ order }, {
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: 'ok' };
    } catch (e) {
      ctx.body = { success: false, info: 'notok' };
    }
  }

  async delPush() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Push.destroy({
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
    }
  }
}

module.exports = CommonController;
