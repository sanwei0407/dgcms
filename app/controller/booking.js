const Controller = require('egg').Controller;
class BookingController extends Controller {

  async list() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    let { page, limit, name } = ctx.request.body;

    page = page ? page : 1;
    limit = limit ? limit : 40;
    const offset = (page - 1) * limit;

    const where = {};
    if (name) where.title = { [Op.like]: `${name}%` };
    const res = await ctx.model.Booking.findAndCountAll({
      where,
      limit,
      offset,
      raw: true,
    });
    ctx.body = { success: true, data: res };
  }

  async getOne() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不存在' };
    const data = await ctx.model.Booking.findByPk(id);
    ctx.body = { success: true, data };
  }

  async create() {
    const { ctx, app } = this;
    const { title, desc, type, peoples, cover, address, zone } = ctx.request.body;
    if (!title) return ctx.body = { success: false, info: '标题不能为空' };

    try {
      await ctx.model.Booking.create({
        title,
        desc,
        type,
        peoples,
        cover,
        address,
        zone,
      });
      ctx.body = { success: true, info: '添加成功' };

    } catch (e) {
      ctx.body = { success: false, info: '添加失败' };
    }

  }


  async update() {
    const { ctx } = this;
    const { title, id } = ctx.request.body;
    if (!title) return ctx.body = { success: false, info: '标题不能为空' };
    if (!id) return ctx.body = { success: false, info: '缺失必要参数 id' };
    const update = { ...ctx.request.body };
    delete update.id;
    try {
      await ctx.model.Booking.update(update, {
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '更新成功' };

    } catch (e) {
      ctx.body = { success: false, info: '更新失败' };
    }

  }
  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '缺失必要参数 id' };
    try {
      await ctx.model.Booking.destroy({
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 场馆预约列表页

  async pcindex() {
    const { ctx } = this;
    await ctx.service.common.getCommonData(); // 获取全局通用数据

    let { page, zoneType, type } = ctx.query;
    const limit = 9;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    const where = {};
    if (zoneType) where.zoneType = zoneType;
    if (type) where.type = type;

    const _places = await ctx.model.Booking.findAll({
      where,
      limit,
      offset,
    });

    ctx.locals.places = _places;
    ctx.locals.page = page;
    ctx.locals.innerNav = [
      { seoUrl: '/', name: '首页' },
      { seoUrl: '/book', name: '场馆预约' },
    ];

    ctx.locals.cate = {
      seoUrl: '/book',
    };

    await ctx.render('theme/default/book_list.nj'); // 最终渲染
  }

  // 场馆详情页面
  async pcdetail() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.service.common.getCommonData(); // 获取全局通用数据

    const placeinfo = await ctx.model.Booking.findByPk(id);
    ctx.locals.placeinfo = placeinfo;
    ctx.locals.bookId = id;
    ctx.locals.innerNav = [
      { seoUrl: '/', name: '首页' },
      { seoUrl: '/book', name: '场馆预约' },
    ];

    ctx.locals.cate = {
      seoUrl: '/book',
    };
    await ctx.render('theme/default/bookdetail.nj'); // 最终渲染

  }


}
module.exports = BookingController;
