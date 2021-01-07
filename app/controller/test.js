'use strict';
const Controller = require('egg').Controller;

class TestController extends Controller {
  async aa() {
    const { ctx, app } = this;
    const res = await ctx.model.Article.findAll();

    for (const item of res) {
      item.update({ contentSummary: item.content.replace(/<.*?>/g, '').replace(/&nbsp;/g,'').slice(0, 80) });
    }

  }

}

module.exports = TestController;
