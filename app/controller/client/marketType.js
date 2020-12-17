'use strict';
const Controller = require('egg').Controller;
class houseController extends Controller {
    // 添加二手分类
    async addMarketType() {
        const {
            ctx
        } = this
        const {
            type
        } = ctx.request.body
        if (!type) return ctx.body = {
            success: false,
            msg: '请输入分类类型'
        }
        try {
            const findRes = await ctx.model.MarketType.findOne({
                where: {
                    type,
                }
            })
            if (findRes == null) {
                const res = await ctx.model.MarketType.create({
                    type: type,
                    isDelete: 0

                })
                ctx.body = {
                    success: true,
                    msg: '添加成功'
                }
            } else {
                ctx.body = {
                    success: false,
                    msg: '该分类已存在'
                }
            }

        } catch (e) {
            ctx.body = {
                success: false,
                msg: '添加失败',
                error: e,
            }
        }
    }
    // 删除二手分类
    async delMarketType() {
        const {
            ctx
        } = this
        const {
            id
        } = ctx.request.body
        if (!id) return ctx.body = {
            success: false,
            msg: '缺少必要参数'
        }
        try {
            const res = await ctx.model.MarketType.update({
                isDelete: 1
            }, {
                where: {
                    id
                }
            })
            ctx.body = {
                success: true,
                msg: '删除成功'
            }
        } catch (e) {
            ctx.body = {
                success: false,
                msg: '删除失败'
            }

        }
    }

    // 修改二手分类信息
    async updateMarketType() {
        const {
            ctx
        } = this
        const {
            id,
            type
        } = ctx.request.body
        if (!id) return ctx.body = {
            success: false,
            msg: '缺少必要参数'
        }
        try {
            const res = await ctx.model.MarketType.update({
                type: type
            }, {
                where: {
                    id
                }
            })
            ctx.body = {
                success: true,
                msg: '修改成功'
            }
        } catch (e) {
            ctx.body = {
                success: false,
                msg: '修改失败'
            }
        }
    }
    // 获取二手商品分类列表
    async getMarketType() {
        const {
            ctx,
            app
        } = this
        let {
            type,
            page,
            limit
        } = ctx.request.body
        const {
            Op
        } = app.Sequelize;
        const where = {
            isDelete: 0
        };
        if (type) where.type = {
            [Op.like]: '%' + type + '%'
        };
        limit = limit ? limit : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try {
            const res = await ctx.model.MarketType.findAndCountAll({
                where,
                limit,
                offset,
            })
            ctx.body = {
                success: true,
                msg: res
            };
        } catch (e) {
            ctx.body = {
                success: false,
                msg: '查询失败'
            };
        }
    }

}

module.exports = houseController;