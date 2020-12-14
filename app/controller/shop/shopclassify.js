'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ArticleController extends Controller {

    // @添加商品类别
    // cateid-类别编号 parentid-父类别编号 classname-类别名称
    // status-使用状态 1.可用 0.不可用 sortorder-类别排序 createtime-创建时间
    async addClassify() {
        const {
            ctx,
        } = this;
        const {
            parentid,
            classname,
            status,
            sortorder,
        } = ctx.request.body;
        if (!parentid) return ctx.body = { success: false, msg: '请输入父类别编号'};
        if (!classname) return ctx.body = { success: false, msg: '请输入类别名称'};
        if (!status) return ctx.body = { success: false, msg: '请输入使用状态'};
        if (!sortorder) return ctx.body = { success: false, msg: '请输入类别排序'};
        try {
            await ctx.model.Shopclassify.create({
                parentid,
                classname,
                status,
                sortorder,
                createtime:  Date.now(),
                isDelete: 0,
            });
            ctx.body = {
                success: true,
                msg: '添加商品类别成功'
            };
        } catch (e) {
            console.log(e);
            ctx.body = { success: false, msg: '添加商品类别失败',e}
        }
    }

    // @删除商品类别
    // cateid-类别编号 parentid-父类别编号 classname-类别名称
    // status-使用状态 1.可用 0.不可用 sortorder-类别排序 createtime-创建时间
    async delClassify() {
        const {
            ctx,
        } = this;
        const {
            cateid,
        } = ctx.request.body;
        try {
            await ctx.model.Shopclassify.update({
                isDelete: 1,
            },
                {
                    where: {
                        cateid,
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

    // 查找商品类别
    // cateid-类别编号 parentid-父类别编号 classname-类别名称
    // status-使用状态 1.可用 0.不可用 sortorder-类别排序 createtime-创建时间
    async findClassify() {
        const { ctx, app } = this;
        let {
            parentid,
            classname,
            status,
            sortorder,
            createtime,
            page,
            limit,
        } = ctx.request.body;
        const { Op } = app.Sequelize;
        const where = { isDelete: 0 };
        if (parentid) where.parentid = { [Op.like]: parentid + '%' };
        if (classname) where.classname = { [Op.like]: classname + '%' };
        if (status) where.status = { [Op.like]: status + '%' };
        if (sortorder) where.sortorder = { [Op.like]: sortorder + '%' };
        if (createtime) where.createtime = { [Op.like]: createtime + '%' };

        limit = limit ? limit * 1 : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try{
            const res = await ctx.model.Shopclassify.findAndCountAll({
                where,
                limit,
                offset,
                attributes : {
                    exclude: ['isDelete'],
                },
            });
            ctx.body = { success: true, data: res };
        } catch (e) {
            ctx.body = { success: false, info: '查询失败' };
            console.log(e);
        }
    }

    // @查询单个商品类别
    // cateid-类别编号 parentid-父类别编号 classname-类别名称
    // status-使用状态 1.可用 0.不可用 sortorder-类别排序 createtime-创建时间

    async findOneify() {
        const { ctx } = this;
        const { cateid } = ctx.request.body;
        if (!cateid) return ctx.body = { success: false, info: '该商品类别不存在'};
        try {
            const res = await ctx.model.Shopclassify.findByPk(cateid, { raw: true});
            if (res) {
                return ctx.body = { success: true, data: res};
            }
            ctx.body = { success: false, info:'该商品类别不存在'};
        } catch (e) {
            ctx.body = { success: false, info: '查询出错', e }
        }
    }

    // @编辑商品类别
    // cateid-类别编号 parentid-父类别编号 classname-类别名称
    // status-使用状态 1.可用 0.不可用 sortorder-类别排序 createtime-创建时间
    async reviceify() {
        const { ctx } = this;
        let {
            cateid,
            parentid,
            classname,
            status,
            sortorder,
            createtime,
        } = ctx.request.body;
        const update = {};
        if (parentid) update.parentid = parentid;
        if (classname) update.classname = classname;
        if (status) update.status = status;
        if (sortorder) update.sortorder = sortorder;
        if (createtime) update.createtime = createtime;
        if (!cateid) return ctx.body = { success: false, msg: '该商品类别不存在'};
        try{
            const res = await ctx.model.Shopclassify.update(
                update,
                {
                    where: {
                        cateid,
                    },
                }
            );
            ctx.body = { success: true, msg: '修改成功', data: res };
        } catch (e) {
            console.log(e);
            ctx.body = {
                success: false,
                msg: '修改失败'
            };
        }


    }

}



module.exports = ArticleController;