'use strict';
const Controller = require('egg').Controller;
const utils = require('utility'); // 引入一个工具库

class ApiController extends Controller {

  // 用户中心
  // 我的团队
  async myteam() {
    const { ctx, app } = this;
    let { page, limit } = ctx.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 30;
    const offset = (page - 1) * limit;
    const res = await ctx.model.Artteam.findAndCountAll({
      limit,
      offset,
      raw: true,
    });
    res.rows.forEach(r => {
      // r.zone = app.config.zoneList.find(item => item.value == r.zone).label;
      // r.type = app.config.artTypeList.find(item => item.value = r.type).label;
      if (r.state == 1) r.state = '已审核';
      if (r.state == -1) r.state = '禁用';
      if (r.state == 0) r.state = '等待审核';
    });

    ctx.body = { success: true, status: 200, ...res };
  }
  // 团队风采
  async teamarticle() {
    const { ctx, app } = this;
    let { page, limit } = ctx.query;
    const { uid } = ctx.session;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 30;
    const offset = (page - 1) * limit;
    const res = await ctx.model.Article.findAndCountAll({
      where: {
        uid,
      },
      limit,
      offset,
      raw: true,
    });
    res.rows.forEach(r => {
      r.addTime = new Date(r.addTime).toLocaleDateString();
      if (r.state == 1) r.state = '已审核';
      if (r.state == -1) r.state = '禁用';
      if (r.state == 0) r.state = '等待审核';
    });

    ctx.body = { success: true, status: 200, ...res };
  }

  // api
  async deleArticle() {
    const { ctx } = this;
    const { aid } = ctx.request.body;
    const { uid } = ctx.session;
    try {
      const res = await ctx.model.Article.destroy({
        where: {
          uid,
          aid,
        },
      });
      if (res) return ctx.body = { success: true, backurl: '/user/artteam' };
      ctx.body = { success: false, info: '修改失败' };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败' };
    }
  }

  // 加入活动
  async joinac() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const { uid } = ctx.session;
    if (!uid) return ctx.body = { success: false, backurl: '/login', info: '请重新登录' };

    const ac = await ctx.model.Actions.findOne({
      where: {
        uid,
        activityId: id,
      },
    });
    if (ac) return ctx.body = { success: false, info: '您已经报名，不需要重复报名' };

    try {
      await ctx.model.Actions.create({
        activityId: id,
        uid,
        type: 1,
        addTime: Date.now(),
        state: 2,
      });
      ctx.body = { success: true, info: '成功' };
    } catch (e) {
      ctx.body = { success: false, info: '请重新登录' };
    }
  }

  async activity() {
    const { ctx, app } = this;
    let { type, page, limit } = ctx.query;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 20;
    const offset = (page - 1) * limit;
    const { Op } = app.Sequelize;
    const now = Date.now();
    const where = {};
    const { uid } = ctx.session;
    if (type === 'end') where.eTime = { [Op.gt]: now };
    if (type === 'will') where.eTime = { [Op.lte]: now };

    await ctx.model.Activity.belongsTo(ctx.model.Actions, { foreignKey: 'id', targetKey: 'activityId' });

    const res = await ctx.model.Activity.findAndCountAll({
      where,
      include: [
        {
          model: ctx.model.Actions,
          where: { uid },
          required: true,
        },
      ],
      limit,
      offset,
      order: [[ 'sTime', 'DESC' ]],
    });

    res.rows.forEach(r => {
      r.type = app.config.actypeStr.find(item => item.value = r.type).label;
      r.sTime = new Date(r.sTime).toLocaleDateString();
    });
    ctx.body = {
      success: true,
      ...res,
    };

  }

  // 文章列表
  async acticleList() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    let { type, order, page, limit, cid, cids, keyword } = ctx.request.body;
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 30;
    const offset = (page - 1) * limit;
    const where = {};
    let _order = [];

    const _cate = await ctx.model.Category.findByPk(cid);
    if (_cate.type == 1) {
      const _cids = await ctx.model.Category.findAll({
        where: {
          pid: _cate.cod,
        },
        attributes: [ 'cid' ],
        raw: true,
      });
      cids = _cids.map(r => r.cid).join(',');
    }

    if (cid) where.cid = cid;
    if (cids) where.cid = { [Op.in]: cids.split(',') };
    if (type) where.type = type;
    if (order === 'byview') _order = [[ 'reading', 'DESC' ], [ 'aid', 'DESC' ]];
    if (order === 'bytime') _order = [[ 'addTime', 'DESC' ], [ 'aid', 'DESC' ]];
    if (keyword) where.title = { [Op.like]: `%${keyword}%` };

    const res = await ctx.model.Article.findAll({
      where,
      offset,
      limit,
      order: _order,
      raw: true,
    });

    ctx.body = { success: true, data: res };
  }

  //
  async aclist() {
    const { ctx, app } = this;
    let { type, page, limit, order, keyword } = ctx.request.body;
    const where = {};
    const { Op } = app.Sequelize;
    if (type) where.type = type;
    if (keyword) where.title = { [Op.like]: `%${keyword}%` };
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : 20;

    const offset = (page - 1) * limit;
    let _order = [];
    if (order === 'byview') _order = [[ 'reading', 'DESC' ], [ 'aid', 'DESC' ]];
    if (order === 'bytime') _order = [[ 'addTime', 'DESC' ], [ 'aid', 'DESC' ]];
    const res = await ctx.model.Activity.findAndCountAll({
      where,
      limit,
      offset,
      order,
    });

    ctx.body = {
      success: true,
      ...res,
    };
  }

  async addBook() {
    const { ctx, app } = this;
    const { bookId } = ctx.request.body;
    const { uid } = ctx.session;
    if (!uid) return ctx.body = { success: false, info: '请先登录', backurl: '/login' };

    await ctx.model.Actions.create({
      uid,
      state: 2,
      type: 2,
      updateTime: Date.now(),
      addTime: Date.now(),
      bookId,
      bookInfo: JSON.stringify(ctx.request.body),
      sTime: ctx.request.body.bookTime,
      beizhu: ctx.request.body.sx,
    });


    ctx.body = {
      success: true,
      info: '提交申请成功',
    };

  }

  async mybook() {
    const { ctx, app } = this;
    const { type } = ctx.query;
    const { uid } = ctx.session;
    const { Op } = app.Sequelize;
    const where = {};
    await ctx.model.Booking.belongsTo(ctx.model.Actions, { foreignKey: 'id', targetKey: 'bookId' });
    const todayYear = (new Date()).getFullYear();
    const todayMonth = (new Date()).getMonth();
    const todayDay = (new Date()).getDate();
    const todayTime = (new Date(todayYear, todayMonth, todayDay, '0', '0', '0')).getTime();// 毫秒
    const res = await ctx.model.Booking.findAndCountAll({
      include: [
        {
          model: ctx.model.Actions,
          where: { uid,
            sTime: type === 'will' ? { [Op.gt]: todayTime } : { [Op.lt]: todayTime },
          },
          required: true,
        },
      ],
      raw: true,
    });
    res.rows.forEach(row => {
      row.state = row['action.state'];
    });


    // res.rows.forEach(r => {
    //   if (r.action.state == 2) r.action.state = '等待审核';
    //   if (r.action.state == 3) r.action.state = '审核通过';
    // });
    ctx.body = { success: true, ...res };
  }
}

module.exports = ApiController;
