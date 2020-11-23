'use strict';
const Controller = require('egg').Controller;
class sponsorController extends Controller {
  async addSponsor() {
    const { ctx } = this;
    const { url, name, type, imgurl, order } = ctx.request.body;
    if (!(url && name && type && imgurl && order)) ctx.body = { success: false, info: '请将数据填写完整' };
    try {
      await ctx.model.Sponsor.create({
        url,
        name,
        type,
        imgurl,
        order,
        isdelete: 0,
      });
      ctx.body = { success: true, info: '添加成功！' };
    } catch (e) {
      ctx.body = { success: false, info: e };
    }
  }
  async delSponsor() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) ctx.body = { success: false, info: '请将数据填写完整' };
    try {
      await ctx.model.Sponsor.update({
        isdelete: 1,
      }, {
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      ctx.body = { success: false, info: e };
    }
  }
  async findAllSponsor() {
    const { ctx } = this;
    let { page, limit } = ctx.request.body;
    const where = { isdelete: 0 };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Sponsor.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: e };
    }
  }
  async updataSponsor() {
    const { ctx } = this;
    const { id, url, name, type, imgurl, order } = ctx.request.body;
    try {
      await ctx.model.Sponsor.update({
        url,
        name,
        type,
        imgurl,
        order,
      }, {
        where: {
          id,
        },
      });
      ctx.body = { success: true, info: '修改成功' };
    } catch (e) {
      ctx.body = { success: false, info: e };
    }
  }

}

module.exports = sponsorController;
