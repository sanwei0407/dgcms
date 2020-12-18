'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;

class ArticleController extends Controller {
    // 添加订单明细
    // orderid-订单编号 userid-用户编号 proid-商品id proname-商品名称 proimage-商品图片地址
    // currentunitprice-创建订单单价(保留两位小数) quantity-商品数量 totalprice-商品总价 createtime-创建时间
    async addOrderit() {
        const {
            ctx,
        } = this;
        const {
            orderid,
            userid,
            proid,
            proname,
            proimage,
            currentunitprice,
            quantity,
            totalprice,
        } = ctx.request.body;
        if (!proname) return ctx.body = {success: false, msg: '请输入商品名称'};
        if (!proimage) return ctx.body = {success: false, msg: '请输入商品图片地址'};
        if (!currentunitprice) return ctx.body = {success: false, msg: '请输入商品单价'};
        if (!quantity) return ctx.body = {success: false, msg: '请输入商品数量'};
        if (!totalprice) return ctx.body = {success: false, msg: '请输入商品总价'};
        try {
            await ctx.model.Shoporderitem.create({
                orderid,
                userid,
                proid,
                proname,
                proimage,
                currentunitprice,
                quantity,
                totalprice,
                createtime: Date.now(),
                isDelete: 0,
            });
            ctx.body = {
                success: true,
                msg: '添加订单明细成功'
            };
        } catch (e) {
            console.log(e);
            ctx.body = {success: false, msg: '添加订单明细失败'}
        }
    }

    // 删除订单明细表
    // id-订单明细表id isDelete-是否删除
    async delOrderit() {
        const {
            ctx,
        } = this;
        const {
            id,
        } = ctx.request.body;
        try {
            await ctx.model.Shoporderitem.update({
                    isDelete: 1,
                },
                {
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

    // @查找订单明细表
    // id-订单明细表id isDelete-是否删除  orderid-订单编号
    // userid-用户编号 proid-商品id proname-商品名称 proimage-商品图片地址
    // currentunitprice-创建订单单价(保留两位小数) quantity-商品数量 totalprice-商品总价 createtime-创建时间

    async findOitList() {
        const {ctx, app} = this;
        let {
            orderid,
            userid,
            proid,
            proname,
            proimage,
            currentunitprice,
            quantity,
            totalprice,
            createtime,
            page,
            limit,
        } = ctx.request.body;
        const {Op} = app.Sequelize;
        const where = {isDelete: 0};
        if (orderid) where.orderid = { [Op.like]: orderid + '%' };
        if (userid) where.userid = { [Op.like]: userid + '%' };
        if (proid) where.proid = { [Op.like]: proid + '%' };
        if (proname) where.proname = { [Op.like]: proname + '%' };
        if (proimage) where.proimage = { [Op.like]: proimage + '%' };
        if (currentunitprice) where.currentunitprice = { [Op.like]: currentunitprice + '%' };
        if (quantity) where.quantity = { [Op.like]: quantity + '%' };
        if (totalprice) where.totalprice = { [Op.like]: totalprice + '%' };
        if (createtime) where.createtime = { [Op.like]: createtime + '%' };

        limit = limit ? limit * 1 : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try{
            const res = await ctx.model.Shoporderitem.findAndCountAll({
                where,
                limit,
                offset,
                attributes: {
                    exclude: ['isDelete'],
                },
            });
            ctx.body = {success: true, data: res};
        } catch (e) {
            ctx.body = { success: false, info: '查询失败' };
            console.log(e);
        }
    }

    // @查找单个订单明细(对单个文章进行编辑时使用)
    // id- 订单明细表id
    async findOnelist (){
        const  { ctx } = this;
        const { id } = ctx.request.body;
        if (!id) return ctx.body = { success: false, info: '该订单明细表不存在'};
        try {
            const res = await ctx.model.Shoporderitem.findByPk(id, { raw: true});
            if (res) {
                return ctx.body = { success: true, data: res};
            }
            ctx.body = { success: false, info:'该订单明细表不存在'};
        }catch (e) {
            ctx.body = {success: false, info: '查询出错' ,e }
            }
        }


    // @编辑订单明细(对单个订单明细进行编辑时使用)
    // id-订单明细表id isDelete-是否删除  orderid-订单编号
    // userid-用户编号 proid-商品id proname-商品名称 proimage-商品图片地址
    // currentunitprice-创建订单单价(保留两位小数) quantity-商品数量 totalprice-商品总价 createtime-创建时间
    async reviceOit() {
        const { ctx } = this;
        let {
            id,
            orderid,
            userid,
            proid,
            proname,
            proimage,
            currentunitprice,
            quantity,
            totalprice,
            createtime,
        } = ctx.request.body;
        const update = {};
        if (orderid) update.orderid = orderid;
        if (userid) update.userid = userid;
        if (proid) update.proid = proid;
        if (proname) update.proname = proname;
        if (proimage) update.proimage = proimage;
        if (currentunitprice) update.currentunitprice = currentunitprice;
    if (quantity) update.quantity = quantity;
        if (totalprice) update.totalprice = totalprice;
        if (createtime) update.createtime = createtime;
        if (!id) return ctx.body = { success: false, msg: '该订单明细表不存在'};
        try{
            const res = await ctx.model.Shoporderitem.update(
                update,
                {
                    where: {
                        id,
                    },
                });
            ctx.body = { success: true, msg: '修改成功', data: res };
        } catch (e) {
            console.log(e);
            ctx.body = {
                success: false,
                msg: '修改失败',
            };
        }
    }

}


module.exports = ArticleController;
