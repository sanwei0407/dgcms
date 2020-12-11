'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ArticleController extends Controller {

    // @添加 购物车
    // carid-购物车id userid-用户id proid-商品id quantity-商品数量
    // checked-是否勾选 1.勾选 2.未勾选 createtime-创建时间

    async addCar() {
        const {
            ctx,
        } = this;
        const {
            userid,
            proid,
            quantity,
            checked,
        } = ctx.request.body;
        if (!userid) return ctx.body = { success: false, msg: '请输入用户id'};
        if (!proid) return ctx.body = { success: false, msg: '请输入商品id'};
        try{
            await ctx.model.Shopcart.create({
                userid,
                proid,
                quantity,
                checked,
                createtime: Date.now(),
                isDelete: 0,
            });
            ctx.body = {
                success: true,
                msg: '添加购物车成功',
            };
        } catch (e) {
           console.log(e);
           ctx.body = { success: false, msg: '添加购物车失败'};
        }
    }

    // @删除购物车
    // carid-购物车id userid-用户id proid-商品id quantity-商品数量
    // checked-是否勾选 1.勾选 2.未勾选 createtime-创建时间

    async delCar() {
        const {
            ctx,
        } = this;
        const {
            carid,
        } = ctx.request.body;
        try {
            await ctx.model.Shopcart.update({
                isDelete: 1,
            },
                {
                    where: {
                        carid,
                    },
                });
            ctx.body = {
                success: true,
                msg: '删除成功',
            };
        } catch (e) {
            console.log(e);s
        }
    }

    // @查找购物车
    // carid-购物车id userid-用户id proid-商品id quantity-商品数量
    // checked-是否勾选 1.勾选 2.未勾选 createtime-创建时间

    async findCartList (){
        const { ctx, app } = this;
        let { userid,
            proid,
            page,
            limit,
    } = ctx.request.body;
        const { Op } = app.Sequelize;
        const where = { isDelete: 0 };
        if (userid) where.userid = { [Op.like]: userid + '%' };
        if (proid) where.proid = { [Op.like]: proid + '%' };
        limit = limit ? limit * 1 : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try{
            const res = await ctx.model.Shopcart.findAndCountAll({
                where,
                limit,
                offset,
                attributes: {
                    exclude: ['isDelete'],
                },
            });
            ctx.body = { success: true, data: res };
        } catch (e) {
            ctx.body = { success: false, info: '查询失败',e };
        }
    }


}

module.exports = ArticleController;
