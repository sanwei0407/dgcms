'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class BaseParameterController extends Controller {

  // @author Martin
  // @last update 2020年11月11日10:53:56
  // @添加参数
  // key-键名 value-值 name-中文名
  async addBP() {
    const {
      ctx, app,
    } = this;
    const { Op } = app.Sequelize;
    const {
      key,
      value,
      name,
    } = ctx.request.body;
    if (!key) return ctx.body = { success: false, msg: '请输入键!' };
    if (!name) return ctx.body = { success: false, msg: '请输入中文名!' };

    try {
      const res = await ctx.model.BaseParameter.findAll({
        where: {
          [Op.or]:
            [
              { name },
              { key },
            ],
        },
      });
      if (res[0]) {
        ctx.body = { success: false, msg: '该参数已存在' };
        return;
      }
      await ctx.model.BaseParameter.create({
        key,
        value,
        name,
      });
      ctx.body = {
        success: true,
        msg: '添加参数成功!',
      };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, msg: '添加参数失败' };
    }

  }

  // @author Martin
  // @last update 2020年11月12日11:33:27
  // @删除参数
  async delBP() {
    const {
      ctx,
    } = this;
    const {
      id,
    } = ctx.request.body;
    try {
      await ctx.model.BaseParameter.destroy({
        where: {
          id,
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

  // @author Martin
  // @last update 2020年11月11日15:33:27
  // @查找全部
  async findBP() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    try {
      const res = await ctx.model.BaseParameter.findAndCountAll({
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败' };
      console.log(e);
    }
  }
  // @author Martin
  // @last update 2020年11月12日11:58:27
  // @编辑参数
  // key-键名 value-值 name-中文名
  async reviceBP() {
    const { ctx } = this;
    const {
      all,
    } = ctx.request.body;
    console.log("接到的数据",all)
    // const update = {};
    // if (key) update.key = key;
    // if (value) update.value = value;
    // if (name) update.name = name;
    // if (!id) return ctx.body = { success: false, msg: '该参数不存在' };
    try {
      for(const item of all){
        const updateData = {...item};
        delete updateData.id;
         await ctx.model.BaseParameter.update(
          updateData,
          {
            where: {
              id:item.Id,
            },
          }
        );
      }
      
      ctx.body = { success: true, msg: '修改成功' };
      console.log("接到的数据",all)
    } catch (e) {
      console.log(e);
      ctx.body = {
        success: false,
        msg: '修改失败',
      };
    }
  }


}

module.exports = BaseParameterController;
