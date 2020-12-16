'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库
class ShopproductController extends Controller {
  // 创建商品
  async shopProductAdd() {
    const { ctx } = this;
    const { cateid, proname, subtitle, mainimage, detail, price, stock, status } = ctx.request.body;
    if (!cateid) return ctx.body = { success: false, info: '请填写商品类型编号' };
    if (!proname) return ctx.body = { success: false, info: '请填写商品名称' };
    if (!subtitle) return ctx.body = { success: false, info: '请填写商品副标题' };
    if (!mainimage) return ctx.body = { success: false, info: '请选择商品图片' };
    if (!detail) return ctx.body = { success: false, info: '请填写商品详情' };
    if (!price) return ctx.body = { success: false, info: '请填写商品价格' };
    if (!stock) return ctx.body = { success: false, info: '请填写商品库存数量' };
    if (!status) return ctx.body = { success: false, info: '请填写商品状态' };
    try {
      ctx.model.Shopproduct.create({
        cateid,
        proname,
        subtitle,
        mainimage,
        detail,
        price,
        stock,
        status,
        createtime: Date.now(),
      });
      ctx.body = { success: true, info: '新增商品成功' };
    } catch (e) {
      ctx.body = { success: false, info: '新增商品失败' };
      console.log(e);
    }
  }

  // 删除商品
  async shopProductDel() {
    const { ctx } = this;
    const { proid } = ctx.request.body;
    try {
      await ctx.model.Shopproduct.destroy({
        where: {
          proid,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 查询商品列表
  async shopProductFind() {
    const { ctx, app } = this;
    let { cateid, proname, subtitle, price, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (cateid) where.cateid = { [Op.like]: '%' + cateid + '%' };
    if (proname) where.proname = { [Op.like]: '%' + proname + '%' };
    if (subtitle) where.subtitle = { [Op.like]: '%' + subtitle + '%' };
    if (price) where.price = { [Op.like]: price + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Shopproduct.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, info: '查询成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // 根据id查询详细信息
  async shopProductFindOne() {
    const { ctx } = this;
    const { proid } = ctx.request.body;
    if (!proid) return ctx.body = { success: false, info: '商品id不正确' };
    try {
      const res = await ctx.model.Shopproduct.findOne({
        where: {
          proid,
        },
      });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该用户id不存在' };
    } catch (e) {
      ctx.body = { success: false, info: '查询出错' };
    }
  }

  // 修改商品信息
  async shopProductUpdate() {
    const { ctx } = this;
    const { proid, cateid, proname, subtitle, mainimage, detail, price, stock, status } = ctx.request.body;
    const update = {};
    if (cateid) update.cateid = cateid;
    if (proname) update.proname = proname;
    if (subtitle) update.subtitle = subtitle;
    if (mainimage) update.mainimage = mainimage;
    if (status) update.status = status;
    if (detail) update.detail = detail;
    if (price) update.price = price;
    if (stock) update.stock = stock;
    try {
      const res = await ctx.model.Shopproduct.update(update, {
        where: {
          proid,
        },
      });
      ctx.body = { success: true, info: '修改成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败', e };
    }
  }

  // 查询商品列表(前端用)
  async appProductFind() {
    const { ctx, app } = this;
    const { cateid, proname, subtitle, price } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = {};
    if (cateid) where.cateid = { [Op.like]: '%' + cateid + '%' };
    if (proname) where.proname = { [Op.like]: '%' + proname + '%' };
    if (subtitle) where.subtitle = { [Op.like]: '%' + subtitle + '%' };
    if (price) where.price = { [Op.like]: price + '%' };
    try {
      const res = await ctx.model.Shopproduct.findAndCountAll({
        where,
      });
      ctx.body = { success: true, info: '查询成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // 根据id查询详细信息(前端用)
  async appProductFindOne() {
    const { ctx } = this;
    const { proid } = ctx.request.body;
    if (!proid) return ctx.body = { success: false, info: '商品id不正确' };
    try {
      const res = await ctx.model.Shopproduct.findOne({
        where: {
          proid,
        },
      });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该用户id不存在' };
    } catch (e) {
      ctx.body = { success: false, info: '查询出错' };
    }
  }
}

module.exports = ShopproductController;
