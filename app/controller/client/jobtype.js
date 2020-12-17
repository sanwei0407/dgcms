'use strict';
const Controller = require('egg').Controller;
class houseController extends Controller {
    // 增加工作类型
    async addJobType() {
        const {
            ctx
        } = this;
        let {
            type,
            Ptype
        } = ctx.request.body;
        if (!type) return ctx.body = {
            success: false,
            msg: '请传入类型'
        }
        if (!Ptype) return ctx.body = {
            success: false,
            msg: '请传入父类型'
        }
        if (type == Ptype) return ctx.body = {
            success: false,
            msg: '类型跟父类型重复'
        }
        try {
            // 判断有没有传入父类
            if (Ptype) {
                // 去数据库找有没有一样的类型和父类
                const typeRes = await ctx.model.Jobtype.findOne({
                    where: {
                        type: type,
                        Ptype: Ptype,
                    }
                })
                // 如果没有一样的类型和父类 才允许添加
                if (typeRes == null) {
                    console.log('typeRes == null')
                    // 判断有没有该父类
                    let pp = await ctx.model.Jobtype.findOne({
                        where: {
                            type: Ptype
                        }
                    })
                    // 如果有该父类才允许添加
                    if (pp) {
                        try {
                            let res = await ctx.model.Jobtype.create({
                                type: type,
                                Ptype: Ptype,
                                isDelete: 0
                            })
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
                            msg: '该父类不存在'
                        }
                    }

                } else {
                    ctx.body = {
                        success: false,
                        msg: '类型已存在'
                    }
                }
            } else {
                const res = await ctx.model.Jobtype.findOne({
                    where: {
                        type: type,
                        Ptype: 0,
                    }
                })
                if (res == null) {
                    console.log('res == null')
                    try {
                        let res = await ctx.model.Jobtype.create({
                            type: type,
                            Ptype: 0,
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
                msg: '添加失败'
            }
        }
    }
    // 删除工作类型 软删除
    async delJobType() {
        const {
            ctx
        } = this
        let {
            id
        } = ctx.request.body
        if (!id) return ctx.body = {
            success: false,
            msg: '请传入必要参数'
        }
        try {
            const res = await ctx.model.Jobtype.update({
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
                msg: '删除失败' + e
            }
        }
    }
    // 删除工作类型 直接删除
    async destroyJobType() {
        const {
            ctx
        } = this;
        let {
            id
        } = ctx.request.body;
        if (!id) return ctx.body = {
            success: false,
            msg: '缺少必要参数'
        }
        try {
            const res = await ctx.model.Jobtype.destroy({
                where: {
                    id
                }
            })
            ctx.body = {
                success: true,
                msg: '删除成功'
            }
            console.log(res)
        } catch (e) {
            console.log(e)
            ctx.body = {
                success: false,
                msg: '删除失败' + e
            }
        }
    }
    // 获取列表
    async getJobTypeList() {
        const {
            ctx,
            app
        } = this
        let {
            type,
            Ptype,
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
        if (Ptype) where.Ptype = {
            [Op.like]: '%' + Ptype + '%'
        };
        limit = limit ? limit : 20;
        page = page ? page : 1;
        const offset = (page - 1) * limit;
        try {
            const res = await ctx.model.Jobtype.findAndCountAll({
                where,
                limit,
                offset,
            });
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
    // 修改分类信息
    async updateJobType() {
        const {
            ctx,
            app
        } = this
        let {
            type,
            Ptype,
            id
        } = ctx.request.body
        if (!id) return ctx.body = {
            success: false,
            msg: '缺少必要参数'
        }
        if (type == Ptype) return ctx.body = {
            success: false,
            msg: '类型和父类型不能相同'
        }
        let update = {}
        if (type) update.type = type
        if (Ptype) update.Ptype = Ptype
        try {
            const res = await ctx.model.Jobtype.update(update, {
                where: {
                    id
                }
            })
            ctx.body = {
                success: true,
                mag: '修改成功'
            };

        } catch (e) {
            ctx.body = {
                success: true,
                mag: '修改失败' + e
            };
        }
    }

}

module.exports = houseController;