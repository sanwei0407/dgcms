'use strict';
const Controller = require('egg').Controller;

class TestController extends Controller {
  async aa() {
    const { ctx, app } = this;
    const res = await ctx.model.Article.findAll();

    for (const item of res) {
      item.update({ contentSummary: item.content.replace(/<.*?>/g, '').slice(0, 60) });
    }

  }

}

module.exports = TestController;
