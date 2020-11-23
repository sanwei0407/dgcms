'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');// 引入node的文件处理模块
const path = require('path'); // 引入node的路径处理模块
const filePath = path.resolve('./dist'); // 调用文件遍历方法
const dirTree = require('directory-tree');

class CommonController extends Controller {

  // node读取文件夹中的文件信息
  getAllzbx() {
    const { app, ctx } = this;
    console.log('123123123');
    console.log(app.baseDir);
    try {
      // const tree = dirTree(app.baseDir+`/app/view`); // 方法1获取路径
      const tree = dirTree('/app/view'); // 方法2获取路径
      console.log(tree);
      ctx.body = tree;
    } catch (e) {
      console.log(e);
    }

  }

  // 参考例子-模版-栏目-主题色
  async abc() {
    const { ctx } = this;
    console.log('reqis', ctx.req);
    let templateDir;
    // 拿到path
    const path = ctx.req.url.split('/');
    if (path.length === 2) {
      // 说明是列表页 //   /kfc  ['','kfc']
      // 查询是哪个栏目
      const cate = await ctx.model.Category.findOne({
        where: {
          seoUrl: '/' + path[1],
        },
        raw: true,
      });

      // 查询该栏目使用哪个模板

      const _template = await ctx.model.Template.findByPk(cate.templateId);

      // 查询当前使用的是什么的主题  defaut
      const curTheme = 'default';
      templateDir = `/theme/${curTheme}/${_template.path}`;


      // 获取模板要使用到的数据


    }
    if (path.length === 3) {
      // 说明是内容页   ///     /kfc/34343  ['','kfc','34343']
    }
    await ctx.render(templateDir, {});

  }

}

module.exports = CommonController;
