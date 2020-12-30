'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class BookingController extends Controller {
  // @author lk
  async finfAllBooking() {
    const { ctx, app } = this;
    let { title, desc, type, people, address, zone, tags, size, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { };
    if (type) where.type = { [Op.like]: '%' + type + '%' };
    if (title) where.title = { [Op.like]: '%' + title + '%' };
    if (zone) where.zone = { [Op.like]: '%' + zone + '%' };
    if (desc) where.desc = { [Op.like]: '%' + desc + '%' };
    if (address) where.address = { [Op.like]: '%' + address + '%' };
    if (people) where.people = { [Op.like]: '%' + people + '%' };
    if (tags) where.tags = { [Op.like]: '%' + tags + '%' };
    if (size) where.size = { [Op.like]: '%' + size + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Booking.findAndCountAll({
        where,
        limit,
        offset,
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  // @author lk
  async finfOneBooking() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: 'id不正确' };
    try {
      const res = await ctx.model.Booking.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该id不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
    }
  }

  // @author lk
  async editBooking() {
    const { ctx } = this;
    const { id, title, desc, type, people, address, zone, tags, size, paiban, gps, cover } = ctx.request.body;
    const update = {};
    if (title) update.title = title;
    if (desc) update.desc = desc;
    if (type) update.type = type;
    if (people) update.people = people;
    if (address) update.address = address;
    if (zone) update.zone = zone;
    if (tags) update.tags = tags;
    if (size) update.size = size;
    if (paiban) update.paiban = paiban;
    if (gps) update.gps = gps;
    if (cover) update.cover = cover;
    if (!id) return ctx.body = { success: false, msg: '该场馆预约不存在' };
    try {
      await ctx.model.Booking.update(
        update,
        {
          where: {
            id,
          },
        }
      );
      ctx.body = { success: true, info: '修改成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '修改失败' };
    }
  }

}

module.exports = BookingController;
