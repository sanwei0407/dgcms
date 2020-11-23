'use strict';
const Controller = require('egg').Controller;

class TestController extends Controller {
  async aa() {
    const { ctx, app } = this;
    await ctx.render('test.nj');
  }

}

module.exports = TestController;
