'use strict';
const Controller = require('egg').Controller;
class ServerTypeController extends Controller {
    /**
     * @author qiyin
     * @updata 2020.12.9 16:00
     * @ 编辑服务类型的增删改查接口
     */
    // 增加服务类型
    async addServeType() {
        const {
            ctx
        } = this;
        const {
            serve,
            Pserve
        } = ctx.request.body
        if (!serve) return ctx.body = {
            success: false,
            msg: '请输入服务类型'
        }
        if (!Pserve) return ctx.body = {
            success: false,
            msg: '请输入所属服务类型范围'
        }
        try {
            const res = await ctx.model.ServeType.create({
                serve, // 服务类型
                Pserve, // 所属服务类型
                isDelete: 0, // 是否删除
            })
            ctx.body = {
                success: true,
                msg: '添加成功',
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                success: false,
                msg: 'e' + e
            }
        }
    }
    // 删除服务类型
    async delServeType() {
        const {
            ctx
        } = this;
        const {
            id
        } = ctx.request.body;
        try {
            const res = await ctx.model.ServeType.update({
                isDelete: 1,
            }, {
                where: {
                    id,
                }
            })
            ctx.body = {
                success: true,
                msg: '删除成功'
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                success: false,
                msg: '删除失败'
            }
        }
    }
    // 更改服务类型
    async updateServeType() {
        const {
            ctx
        } = this;
        let {
            id,
            serve,
            Pserve
        } = ctx.request.body

        if (!id) return ctx.body = {
            success: false,
            msg: '缺少必要参数，更改失败'
        }

        try {
            const res = await ctx.model.ServeType.update({
                serve,
                Pserve
            }, {
                where: {
                    id
                }
            })
            ctx.body = {
                success: true,
                msg: '更改成功'
            }
        } catch (e) {
            ctx.body = {
                success: false,
                msg: e
            }
            console.log(e)
        }
    }
    // 得到服务类型列表
    async getServeTypeList() {
        const {
            ctx
        } = this;
        let {
            limit,
            page
        } = ctx.request.body
        limit = limit ? limit * 1 : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try {
            const res = await ctx.model.ServeType.findAndCountAll({
                limit,
                offset
            })
            ctx.body = {
                success: true,
                msg: res
            }
        } catch (e) {
            console.log(e)
            ctx.body = {
                success: false,
                msg: '查询失败'
            }
        }
    }

}
module.exports = ServerTypeController;