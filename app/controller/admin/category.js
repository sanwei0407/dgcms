'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;
const pinyin4js = require('pinyin4js');


class CategoryController extends Controller {
  // @author undefined（罗铿）
  // @last update 2020年11月11日 11:11
  // 添加栏目接口
  // name-栏目名 seoUrl-搜索链接 templateId-模板id isNav-是否在主导航上显示 order-排序,越大约前面 ctTemplateId-内容的模板id
  async categoryadd() {
    const { ctx } = this;
    const { name, seoUrl, templateId, isNav, order, ctTemplateId, pid, type, outUrl, keyWord, desc, ctHtml, isSubmit } = ctx.request.body;
    if (!name) return ctx.body = { success: false, info: '请填写栏目名' };
    // todo seoUrl 不需要必填 如果没有传进来就用 上面的栏目名的拼音
    if (!seoUrl) return ctx.body = { success: false, info: '请填写搜索链接' };
    if (!templateId) return ctx.body = { success: false, info: '请填写模板id' };
    if (!isNav) return ctx.body = { success: false, info: '请填写isNav' };
    if (!order) return ctx.body = { success: false, info: '请填写排序' };
    if (!ctTemplateId) return ctx.body = { success: false, info: '请填写排序' };
    if (!type) return ctx.body = { success: false, info: '请选择类型' };
    if (type == 3 && !outUrl) return ctx.body = { success: false, info: '请填写外部跳转链接' };
    // if (!keyWord) return ctx.body = { success: false, info: '请填写关键字' };
    // if (!desc) return ctx.body = { success: false, info: '请填写描述' };
    if (!isSubmit) return ctx.body = { success: false, info: '请判断是否投稿' };
    if (pid) {
      if (pid != 0) {
        const pes = await ctx.model.Category.findByPk(pid, { raw: true });
        console.log('wwwwwwwwwwwwwwwwwwww', pes);
        if (pes.type == 2) {
          return ctx.body = { success: false, info: '父栏目不能是列表页' };
        }
      }
    }
    const name_seoUrl = pinyin4js.convertToPinyinString(name, '', pinyin4js.WITHOUT_TONE);
    try {
      const res = await ctx.model.Category.create({
        name, // 栏目名
        seoUrl: seoUrl ? seoUrl : name_seoUrl, // 搜索链接
        templateId, // 模板Id
        isNav, // 是否在主导航上显示,导航显示 0=不显示；1=显示
        order, // 排序
        ctTemplateId, // 内容的模板的文件名称
        pid, // 上级栏目id
        type, // 1-最终列表栏目(允许在本栏目发表文档,并生成文档列表)2-频道封面(栏目本身不允许发布文档)3-外部链接(在outUrl里填写的网址)
        outUrl: outUrl ? outUrl : '', // 外部跳转链接
        keyWord, // 关键字
        desc, // 描述
        ctHtml, // 栏目编辑的内容
        isSubmit, // 是否投稿 // 0=不投 1 = 投稿
      });
      ctx.body = { success: true, info: '添加成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '添加失败', e };
      console.log('123', e);
      return;
    }
  }

  // 栏目的编辑
  async categoryupdate() {
    const { ctx } = this;
    const { name, seoUrl, templateId, isNav, order, ctTemplateId, cid, pid, type, outUrl, keyWord, desc, ctHtml, isSubmit } = ctx.request.body;
    if (!cid) return ctx.body = { success: false, info: '未选择cid' };
    const updateData = {};
    if (name) updateData.name = name;
    if (seoUrl) updateData.seoUrl = seoUrl;
    if (templateId) updateData.templateId = templateId;
    if (isNav) updateData.isNav = isNav;
    if (order) updateData.order = order;
    if (ctTemplateId) updateData.ctTemplateId = ctTemplateId;
    if (pid) updateData.pid = pid;
    if (type) updateData.type = type;
    if (outUrl) updateData.outUrl = outUrl;
    if (keyWord) updateData.keyWord = keyWord;
    if (desc) updateData.desc = desc;
    if (ctHtml) updateData.ctHtml = ctHtml;
    if (isSubmit) updateData.isSubmit = isSubmit;
    try {
      const res = await ctx.model.Category.update(updateData, {
        where: {
          cid,
        },
      });
      ctx.body = { success: true, info: '修改成功', data: res };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败', e };
    }
  }

  // 软删除 不删除数据库内容 只更改字段isDelete
  async categorydel() {
    const { ctx } = this;
    const { cid } = ctx.request.body;
    try {
      await ctx.model.Category.update(
        {
          isDelete: 1,
        },
        {
          where: {
            cid,
          },
        });
      ctx.body = { success: true, info: '删除成功' };
    } catch (e) {
      console.log(e);
      ctx.body = { success: false, info: '删除失败' };
    }
  }

  // 查询全部 但把字段isDalete为1的数据过滤不返回
  async categoryfindall() {
    const { ctx, app } = this;
    let { name, seoUrl, page, limit } = ctx.request.body;
    const { Op } = app.Sequelize;
    const where = { isDelete: 0 };
    if (name) where.name = { [Op.like]: '%' + name + '%' };
    if (seoUrl) where.phone = { [Op.like]: '%' + seoUrl + '%' };
    limit = limit ? limit * 1 : 20;
    page = page ? page : 1;
    const offset = (page - 1) * limit;
    try {
      const res = await ctx.model.Category.findAndCountAll({
        where,
        limit,
        offset,
        attributes: {
          exclude: [ 'isDelete' ],
        },
      });
      ctx.body = { success: true, data: res };
    } catch (e) {
      ctx.body = { success: false, info: '查询失败', e };
    }
  }

  async getcategoryOne() {
    const { ctx } = this;
    const { cid } = ctx.request.body;
    if (!cid) return ctx.body = { success: false, info: '该栏目不存在' };
    try {
      const res = await ctx.model.Category.findByPk(cid, { raw: true });
      if (res) {
        return ctx.body = { success: true, data: res };
      }
      ctx.body = { success: false, info: '该栏目不存在' };

    } catch (e) {
      ctx.body = { success: false, info: '查询出错', e };
      console.log(e);
    }
  }

}

module.exports = CategoryController;
