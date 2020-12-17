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
        if (serve == Pserve) return ctx.body = {
            success: false,
            msg: '类型跟父类型重复'
        }
        try {
            // 判断 有没有传入 Pserve
            if (Pserve) {
                // 去找是否有serve和Pserve一样 的服务
                const typeRes = await ctx.model.Servetype.findOne({
                    where: {
                        serve: serve,
                        Pserve: Pserve,
                    }
                })
                // 如果找不到
                if (typeRes == null) {
                    // 判断有没有Pserve 的 服务
                    let pp = await ctx.model.Servetype.findOne({
                        where: {
                            serve: Pserve
                        }
                    })
                    // 如果有的话就可以添加
                    if (pp) {
                        try {
                            let res = await ctx.model.Servetype.create({
                                serve: serve,
                                Pserve: Pserve,
                                isDelete: 0
                            })
                            console.log(res)
                            ctx.body = {
                                success: true,
                                msg: '添加成功',
                                data: res
                            }
                        } catch (e) {
                            console.log(e)
                            ctx.body = {
                                success: false,
                                msg: '添加失败',
                                error: e
                            }
                        }
                    }else{
                        ctx.body = {
                            success: false,
                            msg: '该父类的服务不存在',
                        }
                    }
                } else {
                    ctx.body = {
                        success: false,
                        msg: '类型已存在'
                    }
                }
            } else {
                const res = await ctx.model.Servetype.findOne({
                    where: {
                        serve: serve,
                        Pserve: 0,
                    }
                })
                if (res == null) {
                    console.log('res == null')
                    try {
                        let res = await ctx.model.Servetype.create({
                            serve: serve,
                            Pserve: 0,
                            isDelete: 0
                        })
                        console.log(res)
                        ctx.body = {
                            success: true,
                            msg: '添加成功',
                            data: res
                        }
                    } catch (e) {
                        console.log(e)
                        ctx.body = {
                            success: false,
                            msg: '添加失败',
                            error: e
                        }
                    }
                } else {
                    ctx.body = {
                        success: false,
                        msg: '类型已存在'
                    }

                }
            }
        } catch (e) {
            ctx.body = {
                success: false,
                msg: '添加失败' + e
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
                where: {
                    isDelete: 0
                },
                limit,
                offset,
                attributes: {
                    exclude: ['isDelete'],
                },
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