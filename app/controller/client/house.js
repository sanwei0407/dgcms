'use strict';
const Controller = require('egg').Controller;
// @author 北极光
// @last update 2020年11月23日 14:20
class houseController extends Controller {
  // 增加房屋租聘信息
  async addHouse() {
    const { ctx } = this;
    const { Price, pictureDi, leasingM, houseT, floor, detailedA, indoorF, communalF, houseH, housingD, architecturalA, buildingT, propertyC, propertyCosts, businessD } = ctx.request.body;
    if (!Price) return ctx.body = { success: false, info: '请填写价格' };
    if (!pictureDi) return ctx.body = { success: false, info: '请添加图片' };
    if (!leasingM) return ctx.body = { success: false, info: '请填写租聘方式' };
    if (!houseT) return ctx.body = { success: false, info: '请填写房屋类型' };
    if (!floor) return ctx.body = { success: false, info: '请填写楼层' };
    if (!detailedA) return ctx.body = { success: false, info: '请填详细地址' };
    if (!indoorF) return ctx.body = { success: false, info: '请填写室内设施' };
    if (!communalF) return ctx.body = { success: false, info: '请填写公共设施' };
    if (!houseH) return ctx.body = { success: false, info: '请填写房屋亮点' };
    if (!housingD) return ctx.body = { success: false, info: '请填写房源描述' };
    if (!architecturalA) return ctx.body = { success: false, info: '请填写建筑年代' };
    if (!buildingT) return ctx.body = { success: false, info: '请填写建筑类型' };
    if (!propertyC) return ctx.body = { success: false, info: '请填写物业公司' };
    if (!propertyCosts) return ctx.body = { success: false, info: '请填写物业费用' };
    if (!businessD) return ctx.body = { success: false, info: '请填写所属商圈' };
    try {
      await ctx.model.House.create({
        Price, // 价格
        pictureDi, // 图片展示
        leasingM, // 租聘方式
        houseT, // 房屋类型
        floor, // 楼层
        detailedA, // 详细地址
        indoorF, // 室内设施
        communalF, // 公共设施
        houseH, // 房屋亮点
        housingD, // 房源描述
        architecturalA, // 建筑年代
        buildingT, // 建筑类型
        propertyC, // 物业公司
        propertyCosts, // 物业费用
        businessD, // 所属商圈
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败', e };
    }
  }

  // 删除房屋租聘信息
  async delHouse() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.House.update(
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

  // 查找单个房屋租聘信息
  async findOneHouse() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    // eslint-disable-next-line no-return-assign
    if (!id) return ctx.body = { success: false, info: '该招聘信息不存在' };
    try {
      const res = await ctx.model.House.findByPk(id, { raw: true });
      if (res) {
        // eslint-disable-next-line no-return-assign
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该招聘信息不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错 ' };
      console.log(e);
    }
  }

  // 查找所有房屋租聘信息
  async findAllHouse() {
    const { ctx, app } = this;
    let { limit, page, Price, pictureDi, leasingM, houseT, floor, detailedA, indoorF, communalF, houseH, architecturalA, buildingT, propertyC, propertyCosts, businessD } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isdelete: 0 };
    if (Price) where.Price = { [Op.like]: Price + '%' };
    if (pictureDi) where.pictureDi = { [Op.like]: pictureDi + '%' };
    if (leasingM) where.leasingM = { [Op.like]: leasingM + '%' };
    if (houseT) where.houseT = { [Op.like]: houseT + '%' };
    if (floor) where.floor = { [Op.like]: floor + '%' };
    if (detailedA) where.detailedA = { [Op.like]: detailedA + '%' };
    if (indoorF) where.indoorF = { [Op.like]: indoorF + '%' };
    if (communalF) where.communalF = { [Op.like]: communalF + '%' };
    if (houseH) where.houseH = { [Op.like]: houseH + '%' };
    if (architecturalA) where.architecturalA = { [Op.like]: architecturalA + '%' };
    if (buildingT) where.buildingT = { [Op.like]: buildingT + '%' };
    if (propertyC) where.propertyC = { [Op.like]: propertyC + '%' };
    if (propertyCosts) where.propertyCosts = { [Op.like]: propertyCosts + '%' };
    if (businessD) where.businessD = { [Op.like]: businessD + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.House.findAndCountAll({
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
  // 修改房屋招聘信息
  async editHouse() {
    console.log(3333)
    const { ctx } = this;
    const { Price, pictureDi, leasingM, houseT, floor, detailedA, indoorF, communalF, houseH, architecturalA, buildingT, propertyC, propertyCosts, businessD, housingD,id } = ctx.request.body;
    const update = {};
    if (Price) update.Price = Price;
    if (pictureDi) update.pictureDi = pictureDi;
    if (leasingM) update.leasingM = leasingM;
    if (houseT) update.houseT = houseT;
    if (floor) update.floor = floor;
    if (detailedA) update.detailedA = detailedA;
    if (indoorF) update.indoorF = indoorF;
    if (communalF) update.communalF = communalF;
    if (houseH) update.houseH = houseH;
    if (architecturalA) update.architecturalA = architecturalA;
    if (buildingT) update.buildingT = buildingT;
    if (propertyC) update.propertyC = propertyC;
    if (propertyCosts) update.propertyCosts = propertyCosts;
    if (buildingT) update.buildingT = buildingT;
    if (businessD) update.businessD = businessD;
    if (housingD) update.housingD = housingD;
    if (!id) return ctx.body = { success: false, info: '无该id或者未输入id' };
    try {
      const res = await ctx.model.House.update(
        update, {
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

module.exports = houseController;
