'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class OneController extends Controller {
  // @author lk
  async findpagedatas() {
    // eslint-disable-next-line no-unused-vars
    const { ctx, app } = this;
    const where = { pid: 0, isnav: 1 };
    const all = {};
    try {
      const res = await ctx.model.Category.findAndCountAll({
        where,
      });
      all.nav = res;
      const ress = await ctx.model.Article.findAndCountAll({
        limit: 6,
        order: [[ 'aid', 'DESC' ]],
      });
      all.article = ress;
      const resss = await ctx.model.Booking.findAndCountAll({
        limit: 3,
        order: [[ 'id', 'DESC' ]],
      });
      all.booking = resss;
      const ressss = await ctx.model.Activity.findAndCountAll({
        limit: 3,
        order: [[ 'id', 'DESC' ]],
      });
      all.Activity = ressss;
      ctx.body = { success: true, ...all };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }


  // 场馆预定列表页

  async getBookList() {
    const { ctx } = this;
    let { page, zoneType, type, limit } = ctx.request.body;
    limit = limit || 9;
    page = page || 1;
    let outData = {};
    const offset = (page - 1) * limit;
    const where = {};
    if (zoneType) where.zoneType = zoneType;
    if (type) where.type = type;

    const _places = await ctx.model.Booking.findAll({
      where,
      limit,
      offset,
    });

    outData.places = _places;

    // 获取通用数据
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    outData = { ...outData, ...ctx.locals };

    ctx.body = { success: true, ...outData };
  }


  async getOneIndex() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const news = await ctx.model.Article.findAll({
      where: {
        cid: {
          [Op.in]: [ 64, 63, 81, 82 ],
        },
        cover: {
          [Op.not]: null,
        },
        isDelete: 0,
      },
      limit: 4,
      order: [[ 'top', 'DESC' ], [ 'aid', 'DESC' ]],
      raw: true,
    });
    const book = await ctx.model.Booking.findAll({
      order: [[ 'id', 'DESC' ]],
      limit: 6,
    });
    ctx.locals.book = book;
    const activity = await ctx.model.Activity.findAll({
      order: [ 'id', 'DESC' ],
      limit: 4,
    });

    // 获取推送的内容

    await ctx.model.Push.belongsTo(ctx.model.Article, { targetKey: 'aid', foreignKey: 'articleId' });
    const _pushData = await ctx.model.Push.findAll({
      order: [[ 'order', 'DESC' ]],
      type: 1,
      include: [ ctx.model.Article ],
    });

    const pushData = [
      _pushData.filter(r => r.place == 1),
      _pushData.filter(r => r.place == 2),
      _pushData.filter(r => r.place == 3),
      _pushData.filter(r => r.place == 4),

    ];
    ctx.locals.pushData = pushData;

    // 栏目全局设置
    const _category = await ctx.model.Category.findAll({ where: { isNav: 1, isDelete: 0 }, order: [[ 'order', 'ASC' ], [ 'cid', 'ASC' ]], attributes: {
      exclude: [ 'templateId', 'isDelete:', 'ctTemplateId', 'isDelete', 'isSubmit', 'keyWord', 'desc', 'ctHtml' ],
    }, raw: true }); // 获取网站信息
    // 要考虑二级有二级分类的情况
    const _arr = _category.map(r => ({ ...r, children: [] }));
    _arr.forEach(r => {
      if (r.pid > 0) _arr.find(item => item.cid === r.pid).children.push(r);
    });

    _arr.splice(2, 0, { name: '场馆预约', seoUrl: '/book', pid: 0 });
    ctx.locals.category = _arr.filter(r => r.pid === 0);
    ctx.locals.zoneList = [
      { value: 1, label: '万秀区' },
      { value: 2, label: '长洲区' },
      { value: 3, label: '龙圩区' },
      { value: 4, label: '苍梧县' },
      { value: 5, label: '藤县' },
      { value: 6, label: '蒙山县' },
      { value: 7, label: '岑溪市' },
    ];
    ctx.locals.bookTypeList = app.config.bookTypeStr;

    const { uid, phone, state, realname } = ctx.session;

    if (uid) ctx.locals.uid = uid;
    if (phone) ctx.locals.phone = phone;
    if (state) ctx.locals.state = state;
    if (realname) ctx.locals.realname = realname;
    ctx.locals.news = news;
    ctx.locals.activity = activity;

    console.log(ctx.locals)
    ctx.body = { success: true, ...ctx.locals };
  }

}

module.exports = OneController;
