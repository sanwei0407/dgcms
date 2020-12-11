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



}



module.exports = ArticleController;
