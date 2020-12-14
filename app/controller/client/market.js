'use strict';
const Controller = require('egg').Controller;
// @author 北极光
// @last update 2020年11月23日 14:20
class marketController extends Controller {
  // 添加跳蚤市场信息接口
  async addMarket() {
    const { ctx } = this;
    const { Price, condition, region, title,contacts,phone, pictureD, tradeN, commodityD, storeInformation, } = ctx.request.body;
    if (!Price) return ctx.body = { success: false, info: '请填写价格' };
    if (!condition) return ctx.body = { success: false, info: '请填写成色' };
    if (!region) return ctx.body = { success: false, info: '请填写区域' };
    if (!contacts) return ctx.body = { success: false, info: '请填写联系人' };
    if (!pictureD) return ctx.body = { success: false, info: '请添加图片' };
    if (!tradeN) return ctx.body = { success: false, info: '请填写服务类别' };
    if (!commodityD) return ctx.body = { success: false, info: '请填写商品详情' };
    if (!storeInformation) return ctx.body = { success: false, info: '请填写店铺名称' };
    if (!title) return ctx.body = { success: false, info: '请填写标题' };

    try {
      await ctx.model.Market.create({
        Price, // 价格
        condition, // 成色
        region, // 区域
        contacts, // 联系人
        phone, // 联系人手机号码
        pictureD, // 图片展示
        tradeN, // 商品名称
        commodityD, // 商品详情
        storeInformation, // 店铺名称
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败', e };
    }
  }

  // 删除调整市场信息接口
  async delMarket() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Market.update(
        {
          isdelete: 1,
        },
        {
          where: {
            id,
          },
          logging: true,
        });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 查找单个跳蚤市场信息接口
  async findOneMarket() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '该招聘信息不存在' };
    try {
      const res = await ctx.model.Market.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该招聘信息不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }

  // 查找所有调整市场接口
  async findAllMarket() {
    const { ctx, app } = this;
    let { Price, condition, region,title, contacts,phone, pictureD, tradeN, commodityD, storeInformation, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isdelete: 0 };
    if (Price) where.Price = { [Op.like]: Price + '%' };
    if (condition) where.condition = { [Op.like]: condition + '%' };
    if (region) where.region = { [Op.like]: region + '%' };
    if (contacts) where.contacts = { [Op.like]: contacts + '%' };
    if (pictureD) where.pictureDisplay = { [Op.like]: pictureD + '%' };
    if (tradeN) where.tradeName = { [Op.like]: tradeN + '%' };
    if (commodityD) where.commodityDetails = { [Op.like]: commodityD + '%' };
    if (storeInformation) where.storeInformation = { [Op.like]: storeInformation + '%' };
    if (phone) where.phone = { [Op.like]: phone + '%' };
    if (title) where.title = { [Op.like]: title + '%' };


    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Market.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'isdelete' ],
        },
      }
      );
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
    }
  }
  // 修改跳蚤市场信息接口
  async editMarket() {
    const { ctx } = this;
    const { Price, condition, region,title, contacts,phone, pictureD, tradeN, commodityD, storeInformation, id } = ctx.request.body;
    const update = {};
    if (Price) update.Price = Price;
    if (condition) update.condition = condition;
    if (region) update.region = region;
    if (contacts) update.contacts = contacts;
    if (pictureD) update.pictureD = pictureD;
    if (tradeN) update.tradeN = tradeN;
    if (commodityD) update.commodityD = commodityD;
    if (storeInformation) update.storeInformation = storeInformation;
    if (phone) update.phone = phone;
    if (title) update.title = title;


    if (!id) return ctx.body = { success: false, info: '无该id或者未输入id' };
    try {
      const res = await ctx.model.Market.update(update, {
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

module.exports = marketController;
