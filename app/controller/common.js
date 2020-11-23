'use strict';
const Controller = require('egg').Controller;

class CommonController extends Controller {
  // 前后台通用的上传模块
  async upload() {
    const { ctx } = this;
    const res = await ctx.service.common.upload(ctx);
    ctx.body = res;
  }

}

module.exports = CommonController;
