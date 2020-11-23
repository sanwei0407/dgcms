'use strict';
const Controller = require('egg').Controller;

class AdController extends Controller {
  // @author undefined
  // @last update 2020年11月16日 15:55
  // 添加广告接口
  // aid-唯一Id type-广告类型(1-图片 2-轮播图 3-视频) adUrl-广告的链接 desc-广告描述 goto-点击跳转的链接 width-宽度 heigth-高度
  async addad() {
    const { ctx } = this;
    const { type, adUrl, desc, goto, width, height } = ctx.request.body;
    if (!type) return ctx.body = { success: false, info: '请填写广告类型' };
    if (!adUrl) return ctx.body = { success: false, info: '请填写广告地址' };
    if (!desc) return ctx.body = { success: false, info: '请填写广告描述' };
    if (!width) return ctx.body = { success: false, info: '请填写宽度' };
    if (!goto) return ctx.body = { success: false, info: '请填写点击跳转的链接' };
    if (!height) return ctx.body = { success: false, info: '请填写高度' };
    try {
      await ctx.model.Ad.create({
        type,
        adUrl,
        desc,
        goto,
        width,
        height,
      });
      ctx.body = { success: true, msg: '添加广告成功' };
    } catch (e) {
      ctx.body = { success: false, msg: '添加广告失败', e };
    }

  }

  async adFindAll() {
    const { ctx, app } = this;
    let { type, adUrl, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (adUrl) where.adUrl = { [Op.like]: '%' + adUrl + '%' };
    if (type) where.type = { [Op.like]: '%' + type + '%' };
    limit = limit ? limit*1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Ad.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author Martin
  // @last update 2020年11月17日10:10:12
  // @删除广告
  // aid-广告id  isDelete-是否删除
  async delAd() {
    const {
      ctx,
    } = this;
    const {
      aid,
    } = ctx.request.body;
    try {
      await ctx.model.Ad.update({
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
  async findOneAd() {
    const { ctx } = this;
    const { aid } = ctx.request.body;
    if (!aid) return ctx.body = { success: false, info: '该广告不存在' };
    try {
      const res = await ctx.model.Ad.findByPk(aid, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该广告不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }

  async reviceAd() {
    const { ctx } = this;
    const {
      aid,
      type,
      adUrl,
      desc,
      goto,
      width,
      height,
    } = ctx.request.body;
    const update = {};
    if (type) update.type = type;
    if (adUrl) update.adUrl = adUrl;
    if (desc) update.desc = desc;
    if (goto) update.goto = goto;
    if (width) update.width = width;
    if (height) update.height = height;
    if (!aid) return ctx.body = { success: false, msg: '该广告不存在' };
    try {
      const res = await ctx.model.Ad.update(
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


  async adUpload() {
    const { ctx } = this;
    const { service } = ctx;
    const res = await service.common.upload(ctx);
    ctx.body = res;
  }

}

module.exports = AdController;
