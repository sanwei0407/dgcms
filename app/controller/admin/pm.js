const Controller = require('egg').Controller;
class PmController extends Controller {
    // pm -> 站内信 私聊
    // 管理员发送发送信息 -- > 增加
    async adminSent() {
        const {
            ctx
        } = this;
        const {
            toID,
            msg,
        } = ctx.request.body;
        if (!(toID && msg)) {
            return ctx.body = {
                success: false,
                msg: "发送失败,缺少必要的参数",
            }
        }
        try {
            const res = await ctx.model.Pm.create({
                fromID: 0,
                toID,
                msg,
                type: 0,
                sentTime: Date.now(),
                canRead: 1
            })
            ctx.body = {
                success: true,
                msg: "发送成功"
            }
        } catch (e) {
            console.log("adminsent", e)
            ctx.body = {
                success: false,
                msg: "发送失败" + e,
            }
        }
    }

    // 用户发送消息
    async userSent() {
        const {
            ctx
        } = this;
        const {
            fromID,
            toID,
            msg,
        } = ctx.request.body;
        if (!(fromID && toID && msg)) {
            return ctx.body = {
                success: false,
                msg: "发送失败,缺少必要的参数",
            }
        }
        try {
            const res = await ctx.model.Pm.create({
                fromID,
                toID,
                msg,
                type: 1,
                sentTime: Date.now(),
                canRead: 1
            })
            ctx.body = {
                success: true,
                msg: "发送成功"
            }
        } catch (e) {
            console.log("adminsent", e)
            ctx.body = {
                success: false,
                msg: "发送失败" + e,
            }
        }
    }


    // 获取消息列表
    async getPmList() {
        const {
            ctx
        } = this;
        const {
            fromID,
            toID
        } = ctx.request.body
        if (!(fromID && toID)) {
            return ctx.body = {
                success: false,
                msg: "请输入必要参数"
            }
        }
        try {
            const res = await ctx.model.Pm.findAll({
                where: {
                    fromID,
                    toID
                },
                // 不返回消息的ID
                attributes:{
                    exclude:[
                        {
                            canRead: 0
                        }
                    ]
                }
            })
            ctx.body = {
                success: true,
                msg: "查找成功",
                data: res
            }
        } catch (e) {
            ctx.body = {
                success: true,
                msg: "查找失败" + e
            }
        }
    }

    // 删除私信 / 软删除 
    async delPm() {
        const {
            ctx
        } = this;
        const {
            pmID
        } = ctx.request.body
        try {
            const res = await ctx.model.Pm.update({
                canRead: 0
            }, {
                where: {
                    pmID
                }
            })
            ctx.body = {
                success: true,
                msg: "删除成功"
            }
        } catch (e) {
            ctx.body = {
                success: false,
                msg: "删除失败"
            }

        }
    }

}
module.exports = PmController