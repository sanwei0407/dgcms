'use strict';
const Controller = require('egg').Controller;
// @author 北极光
// @last update 2020年11月23日 14:20
class jodController extends Controller {
  // 添加岗位信息
  async addJod() {
    const { ctx } = this;
    const { Salary, post, workA,workAGPS, jodC, jobR, workingH, companyP } = ctx.request.body;
    if (!Salary) return ctx.body = { success: false, info: '请填写工作薪资' };
    if (!post) return ctx.body = { success: false, info: '请填写工作岗位' };
    if (!workA) return ctx.body = { success: false, info: '请填写工作地址' };
    if (!jodC) return ctx.body = { success: false, info: '请填写工作内容' };
    if (!jobR) return ctx.body = { success: false, info: '请填写职位要求' };
    if (!workingH) return ctx.body = { success: false, info: '请填写工作时间' };
    if (!companyP) return ctx.body = { success: false, info: '请填写公司概况' };
    try {
      await ctx.model.Jod.create({
        Salary, // 工作薪资
        post, // 工作岗位
        workA, // 工作地址
        workAGPS, // 地址详细gps信息
        jodC, // 工作内容
        jobR, // 职位要求
        workingH, // 工作时间
        companyP, // 公司概况
      });
      ctx.body = { success: true, info: '添加成功' };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败', e };
    }
  }

  // 删除岗位信息
  async delJod() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    try {
      await ctx.model.Jod.update(
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

  // 查找单个岗位信息
  async findOneJod() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    // eslint-disable-next-line no-return-assign
    if (!id) return ctx.body = { success: false, info: '该招聘信息不存在' };
    try {
      const res = await ctx.model.Jod.findByPk(id, { raw: true });
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

  // 查找所有岗位信息
  async findAllJod() {
    const { ctx, app } = this;
    let { Salary, post, workA, jodC, jobR, workingH, companyP, limit, page } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isdelete: 0 };
    if (Salary) where.Salary = { [Op.like]: Salary + '%' };
    if (post) where.post = { [Op.like]: post + '%' };
    if (workA) where.workA = { [Op.like]: workA + '%' };
    if (jodC) where.jodCentent = { [Op.like]: jodC + '%' };
    if (jobR) where.jobRequirements = { [Op.like]: jobR + '%' };
    if (workingH) where.workingHours = { [Op.like]: +workingH + '%' };
    if (companyP) where.companyProfile = { [Op.like]: companyP + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Jod.findAndCountAll({
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

  // 修改工作信息
  async editJod() {
    console.log("a");
    const { ctx } = this;
    const { Salary, post, workA,workAGPS, jodC, jobR, workingH, companyP, id } = ctx.request.body;
    const update = {};
    if (Salary) update.Salary = Salary;
    if (post) update.post = post;
    if (workA) update.workA = workA;
    if (jodC) update.jodC = jodC;
    if (jobR) update.jobR = jobR;
    if (workingH) update.workingH = workingH;
    if (companyP) update.companyP = companyP;
    if(workAGPS) update.workAGPS = workAGPS;
    if (!id) return ctx.body = { success: false, info: '无该id或者未输入id' };
    try {
      const res = await ctx.model.Jod.update(update, {
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

module.exports = jodController;
