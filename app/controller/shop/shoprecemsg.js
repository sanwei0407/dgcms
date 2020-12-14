'use strict';
const utils = require('utility'); // 引入一个工具库
const Controller = require('egg').Controller;


class ArticleController extends Controller{

    // 添加收货信息
    // shoppingid-收货信息编号(id) userid-用户编号 orderid-订单编号(id) recename-收货人姓名
    // recephone-收货人电话 recemobile-收货人手机号 receprovince-收货人省份
    // rececity-收货人市 recedistrict-收货人区/县 receaddress-收货人详细地址 createtime-创建时间
    async addrece() {
        const {
            ctx,
        } = this;
        const {
            userid,
            orderid,
            recename,
            recephone,
            recemobile,
            receprovince,
            rececity,
            recedistrict,
            receaddress,
        } = ctx.request.body;
        if (!userid) return ctx.body = {success: false, msg: '请输入用户编号'};
        if (!orderid) return ctx.body = {success: false, msg: '请输入订单编号'};
        if (!recename) return ctx.body = {success: false, msg: '请输入收货人姓名'};
        if (!recephone) return ctx.body = {success: false, msg: '请输入收货人电话'};
        if (!recemobile) return ctx.body = {success: false, msg: '请输入收货人手机号'};
        if (!receprovince) return ctx.body = {success: false, msg: '请输入收货人省份'};
        if (!rececity) return ctx.body = {success: false, msg: '请输入收货人城市'};
        if (!recedistrict) return ctx.body = {success: false, msg: '请输入收货人区/县'};
        if (!receaddress) return ctx.body = {success: false, msg: '请输入收货人详细地址'};
        try {
            await ctx.model.Shoprecemsg.create({
                userid,
                orderid,
                recename,
                recephone,
                recemobile,
                receprovince,
                rececity,
                recedistrict,
                receaddress,
                createtime: Date.now(),
                isDelete: 0,
            });
            ctx.body = {
                success: true,
                msg: '添加收货人信息成功'
            };
        } catch (e) {
            console.log(e);
            ctx.body = { success: false, msg: '添加收货人信息失败'}
        }
    }


    // 删除收货信息
    // shoppingid-收货信息编号(id) userid-用户编号 orderid-订单编号(id) recename-收货人姓名
    // recephone-收货人电话 recemobile-收货人手机号 receprovince-收货人省份
    // rececity-收货人市 recedistrict-收货人区/县 receaddress-收货人详细地址 createtime-创建时间
    async delrece() {
        const {
            ctx,
        } = this;
        const {
            shoppingid,
        } = ctx.request.body;
        try {
            await ctx.model.Shoprecemsg.update({
                    isDelete: 1,
                },
                {
                    where: {
                        shoppingid,
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


    // @查找收货人信息
    // shoppingid-收货信息编号(id) userid-用户编号 orderid-订单编号(id) recename-收货人姓名
    // recephone-收货人电话 recemobile-收货人手机号 receprovince-收货人省份
    // rececity-收货人市 recedistrict-收货人区/县 receaddress-收货人详细地址 createtime-创建时间
    async findrece() {
        const { ctx, app } = this;
        let {
            userid,
            orderid,
            recename,
            recephone,
            recemobile,
            receprovince,
            rececity,
            recedistrict,
            receaddress,
            createtime,
            page,
            limit,
        } = ctx.request.body;
        const {Op} = app.Sequelize;
        const where = {isDelete: 0};
        if (userid) where.userid = { [Op.like]: userid + '%' };
        if (orderid) where.orderid = { [Op.like]: orderid + '%' };
        if (recename) where.recename = { [Op.like]: recename + '%' };
        if (recephone) where.recephone = { [Op.like]: recephone + '%' };
        if (recemobile) where.recemobile = { [Op.like]: recemobile + '%' };
        if (receprovince) where.receprovince = { [Op.like]: receprovince + '%' };
        if (rececity) where.rececity = { [Op.like]: rececity + '%' };
        if (recedistrict) where.recedistrict = { [Op.like]: recedistrict + '%' };
        if (receaddress) where.receaddress = { [Op.like]: receaddress + '%' };
        if (createtime) where.createtime = { [Op.like]: createtime + '%' };

        limit = limit ? limit * 1 : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try {
            const res = await ctx.model.Shoprecemsg.findAndCountAll({
                where,
                limit,
                offset,
                attributes: {
                    exclude: ['isDelete'],
                },
            });
            ctx.body = { success: true, data: res};
        } catch (e) {
          ctx.body = { success: false, info: '查询失败' };
          console.log(e);
        }
    }


    // @查找单个订单明细(对单个文章进行编辑时使用)
    // shoppingid-收货信息编号(id)
    async findOnerece() {
        const { ctx } = this;
        const { shoppingid } = ctx.request.body;
        if (!shoppingid) return ctx.body = { success: false, info: '该收货信息不存在'};
        try {
            const res = await ctx.model.Shoprecemsg.findByPk(shoppingid,{ raw: true});
            if (res) {
                return ctx.body = { success: true, data: res };
            }
            ctx.body = { success: false, info: '该收货信息不存在' };
        } catch (e) {
          ctx.body = { success: false, info: '查询出错', e }
        }
    }


    // @编辑收货人信息
    // shoppingid-收货信息编号(id) userid-用户编号 orderid-订单编号(id) recename-收货人姓名
    // recephone-收货人电话 recemobile-收货人手机号 receprovince-收货人省份
    // rececity-收货人市 recedistrict-收货人区/县 receaddress-收货人详细地址 createtime-创建时间
    async reviceRece() {
    const { ctx } = this;
    let {
        shoppingid,
        userid,
        orderid,
        recename,
        recephone,
        recemobile,
        receprovince,
        rececity,
        recedistrict,
        receaddress,
        createtime,
        } = ctx.request.body;
        const update = {};
        if (userid) update.userid = userid;
        if (orderid) update.orderid = orderid;
        if (recename) update.recename = recename;
        if (recephone) update.recephone = recephone;
        if (recemobile) update.recemobile = recemobile;
        if (receprovince) update.receprovince = receprovince;
        if (rececity) update.rececity = rececity;
        if (recedistrict) update.recedistrict = recedistrict;
        if (receaddress) update.receaddress = receaddress;
        if (createtime) update.createtime = createtime;
        if (!shoppingid) return ctx.body = { success: false, msg: '该收货人信息不存在'};
        try {
            const res = await ctx.model.Shoprecemsg.update(
                update,
                {
                where: {
                    shoppingid,
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
