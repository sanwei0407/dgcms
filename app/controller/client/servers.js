'use strict';
const Controller = require('egg').Controller;
// @author 北极光
// @last update 2020年11月23日 14:20
class ServersController extends Controller {
  //  添加服务信息
  async addServers() {
    const { ctx } = this;
    const { category, serviceArea, contacts, businessA, serviceF, serviceC, companyP, serviceContent, movingP, chargingS, serviceComm } = ctx.request.body;
    if (!category) return ctx.body = { success: false, info: '请填类别' };
    if (!serviceArea) return ctx.body = { success: false, info: '请填写服务区域' };
    if (!contacts) return ctx.body = { success: false, info: '请填写联系人' };
    if (!businessA) return ctx.body = { success: false, info: '请填写商家地址' };
    if (!serviceF) return ctx.body = { success: false, info: '请填写服务特色' };
    if (!serviceC) return ctx.body = { success: false, info: '请填写服务类别' };
    if (!companyP) return ctx.body = { success: false, info: '请填公司简介' };
    if (!serviceContent) return ctx.body = { success: false, info: '请填写服务内容' };
    if (!movingP) return ctx.body = { success: false, info: '请填写搬家流程' };
    if (!chargingS) return ctx.body = { success: false, info: '请填写收费标准' };
    if (!serviceComm) return ctx.body = { success: false, info: '请填写服务承诺' };
    try {
      await ctx.model.Servers.create({
        category, // 服务类别
        serviceArea, // 服务区域
        contacts, // 联系人
        businessA, // 商家地址
        serviceF, // 服务特色
        serviceC, // 服务类别
        companyP, // 公司简介
        serviceContent, // 服务内容
        movingP, // 搬家流程
        chargingS, // 收费标准
        serviceComm, // 服务承诺
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '添加失败', e };
    }
  }
  // 删除服务信息
  async delServers() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Servers.update(
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
  // 查找单个服务信息
  async findOneServers() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '该服务信息不存在' };
    try {
      const res = await ctx.model.Servers.findByPk(id, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该服务信息不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }
  // 查找所有服务信息
  async findAllServers() {
    const { ctx, app } = this;
    let { limit, page, category, serviceArea, contacts, businessA, serviceF, companyP, serviceContent, chargingS, serviceComm } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isdelete: 0 };
    if (category) where.category = { [Op.like]: category + '%' };
    if (serviceArea) where.serviceArea = { [Op.like]: serviceArea + '%' };
    if (businessA) where.businessA = { [Op.like]: businessA + '%' };
    if (contacts) where.contacts = { [Op.like]: contacts + '%' };
    if (serviceF) where.serviceF = { [Op.like]: serviceF + '%' };
    if (companyP) where.companyP = { [Op.like]: companyP + '%' };
    if (serviceContent) where.serviceContent = { [Op.like]: serviceContent + '%' };
    if (chargingS) where.chargingS = { [Op.like]: chargingS + '%' };
    if (serviceComm) where.serviceComm = { [Op.like]: serviceComm + '%' };

    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Servers.findAndCountAll({
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
  // 修改服务信息
  async editServers() {
    const { ctx } = this;
    const { category, serviceArea, contacts, businessA, serviceF, serviceC, companyP, serviceContent, movingP, chargingS, serviceComm, id } = ctx.request.body;
    const update = {};
    if (category) update.category = category;
    if (serviceArea) update.serviceArea = serviceArea;
    if (businessA) update.businessA = businessA;
    if (contacts) update.contacts = contacts;
    if (serviceF) update.serviceF = serviceF;
    if (serviceC) update.serviceC = serviceC;
    if (companyP) update.companyP = companyP;
    if (serviceContent) update.serviceContent = serviceContent;
    if (movingP) update.movingP = movingP;
    if (chargingS) update.chargingS = chargingS;
    if (serviceComm) update.serviceComm = serviceComm;
    if (!id) return ctx.body = { success: false, info: '无该id或者未输入id' };
    try {
      const res = await ctx.model.Servers.update(update, {
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

module.exports = ServersController;
