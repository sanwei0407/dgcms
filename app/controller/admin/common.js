'use strict';
const Controller = require('egg').Controller;
const fs = require('fs');// 引入node的文件处理模块
const path = require('path'); // 引入node的路径处理模块
const filePath = path.resolve('./dist'); // 调用文件遍历方法
const dirTree = require('directory-tree');
const pinyin4js = require('pinyin4js');


class CommonController extends Controller {

  // node读取文件夹中的文件目录信息
  getDirTree() {
    const { app, ctx } = this;
    console.log(app.baseDir); // /Users/zhaobaixian/dg/dg_egg

    try {
      const tree = dirTree(app.baseDir + '/app/view'); // 方法1获取路径
      console.log(tree);
      ctx.body = tree;
    } catch (e) {
      ctx.body = { success: false, info: '读取失败' };
      console.log(e);
    }
  }
  // node读取文件夹中的文件信息
  readFileContent() {
    const { app, ctx } = this;
    console.log(app.baseDir);
    const {
      dirTree,
    } = ctx.request.body;
    try {
      // const res = fs.readFileSync(app.baseDir+`/app/view/theme/default/public/foot.nj`);
      // const res = fs.readFileSync(app.baseDir.concat(`${dirTree}`));
      const res = fs.readFileSync(app.baseDir + `${dirTree}`);
      console.log('信息如下：', res);
      ctx.body = res;
    } catch (e) {
      ctx.body = { success: false, info: '读取失败' };
      console.log(e);
    }
  }
  // node修改文件内容 ok
  writeFileContent() {
    const { app, ctx } = this;
    const {
      dirTree,
      content,
    } = ctx.request.body;
    try {
      fs.writeFileSync(app.baseDir + `${dirTree}`, content);
      ctx.body = { success: true, info: '修改成功' };
    } catch (e) {
      ctx.body = { success: false, info: '修改失败' };
      console.log(e);
    }
  }
  // node.js新建文件 ok
  addFile() {
    const { app, ctx } = this;
    const { filePath } = ctx.request.body;
    if (!filePath) {
      ctx.body = { success: false, info: '请输入文件路径' };
      console.log('9999');
      return;
    }
    try {
      fs.accessSync(app.baseDir + filePath, fs.constants.R_OK | fs.constants.W_OK);
      console.log('可以读写');
    } catch (err) {
      console.error('无权访问或无该文件夹');
      fs.appendFileSync(app.baseDir + filePath, '', 'utf8');
      ctx.body = { success: true, info: '新建完成' };
    }
  }
  // node.js新建文件夹 ok
  addDir() {
    const { app, ctx } = this;
    const { fileFolderPath } = ctx.request.body;
    if (!fileFolderPath) return ctx.body = { success: false, info: '请输入文件夹路径' };
    try {
      fs.accessSync(app.baseDir + `${fileFolderPath}`, fs.constants.R_OK | fs.constants.W_OK);
      console.log('可以读写');
    } catch (err) {
      console.error('无权访问或无该文件夹');
      fs.mkdirSync(app.baseDir + `${fileFolderPath}`);
      ctx.body = { success: true, info: '新建完成' };
    }
  }
  // 删除文件 ok
  delFile() {
    const { app, ctx } = this;
    const { filePath } = ctx.request.body;
    if (!filePath) return ctx.body = { success: false, info: '请输入文件路径' };
    try {
      fs.unlinkSync(app.baseDir + `${filePath}`);
      ctx.body = { success: true, info: '删除成功！' };
    } catch (err) {
      ctx.body = { success: false, info: '删除失败,无该文件或无法操作', err };
    }
  }
  // 删除文件夹 ok
  delDir() {
    const { app, ctx } = this;
    const { fileFolderPath } = ctx.request.body;
    if (!fileFolderPath) return ctx.body = { success: false, info: '请输入文件夹路径' };
    try {
      // fs.rmdirSync()
      fs.rmdirSync(app.baseDir + fileFolderPath, {
        recursive: true,
        retryDelay: 100,
      }); // 文件的目录名称
      ctx.body = { success: true, info: '成功删除文件夹' };
    } catch (e) {
      ctx.body = { success: false, info: '删除失败', e };
      console.log(e);
    }
  }
  // 文件重命名 ok
  renameFile() {
    const { app, ctx } = this;
    const { oldPath, newPath } = ctx.request.body;
    if (!oldPath) return ctx.body = { success: false, info: '请输入旧文件名' };
    if (!newPath) return ctx.body = { success: false, info: '请输入新文件名' };
    try {
      fs.renameSync(app.baseDir + `${oldPath}`, app.baseDir + `${newPath}`);
      ctx.body = { success: true, info: '文件重命名成功！' };
    } catch (err) {
      ctx.body = { success: false, info: err };
    }
  }
  // 文件夹重命名 ok
  renameDir() {
    const { app, ctx } = this;
    const { oldPath, newPath } = ctx.request.body;
    if (!oldPath) return ctx.body = { success: false, info: '请输入旧文件夹名' };
    if (!newPath) return ctx.body = { success: false, info: '请输入新文件夹名' };
    try {
      fs.renameSync(app.baseDir + `${oldPath}`, app.baseDir + `${newPath}`);
      ctx.body = { success: true, info: '文件夹重命名成功' };
    } catch (err) {
      console.log(err);
      ctx.body = { success: false, info: '文件夹重命名失败' };
    }
  }

  async pinyin() {
    const { ctx } = this;
    const zbx = pinyin4js.convertToPinyinString('厦门你好大厦厦门', '', pinyin4js.WITHOUT_TONE);
    ctx.body = zbx;

  }

  // 参考例子-模版-栏目-主题色
  async abc() {
    const { ctx, app } = this;
    await ctx.service.common.getCommonData(); // 获取全局通用数据
    const url = ctx.req.url; // 得到请求的url
    let templateDir = ''; // 渲染的模板

    // 渲染首页的情况
    if (url === '/') {
      await ctx.render('theme/default/index.nj');
      return;
    }
    let path = '';

    let page = 1; // 默认都是第一页
    // 兼顾分页的情况 约定分页的链接都是  /page/页码
    if (url.includes('/page')) {
      path = url.split('/page/')[0];
      page = url.split('/page/')[1].split('/')[0];
    } else {
      path = url;
    }
    // 注入当前page
    ctx.locals.page = page;
    ctx.locals.nextPage = page*1 + 1;
    ctx.locals.prePage = page > 1 ? page - 1 : page;

    const isDetailPage = !!path.match(/\/\d+$/g); // 是否是内容页 目前以链接当中是否有 /纯数字/ 为例子

    console.log('isDetailPage', isDetailPage);
    ctx.locals.currentPath = path;

    // 列表页
    if (!isDetailPage) {
      const cate = await ctx.model.Category.findOne({
        where: {
          seoUrl: path,
        },
        raw: true,
      });
      console.log('escape', path);
      if(cate){
        const _tp = cate.templateId;
        templateDir = _tp;
        // 列表页面处理流程
        await ctx.model.Article.belongsTo(ctx.model.Category, { targetKey: 'cid', foreignKey: 'cid' });
        const _article = await app.model.Article.findAll({ where: {
          cid: cate.cid,
          
        }, include: [
          {
            model: ctx.model.Category,
          },
        ] });
  
        app.locals.articleList = _article;
      }
     
    }

    // 内容页处理流程
    if (isDetailPage) {
      const aid = path.match(/\/\d+$/)[0].replace('/', ''); // 内容id
      // 获取文章详情
      const article = await ctx.model.Article.findByPk(aid, { raw: true });
      const cate = await ctx.model.Category.findByPk(article.cid, { raw: true });
      const _tp = cate.ctTemplateId; // 获取内容模板 todo ctTemplateId 变量名语义不清晰
      templateDir = _tp;
      ctx.locals.article = article;
    }

    
    if(templateDir) await ctx.render(templateDir); // 最终渲染
   


  }


  async queryParentCategory(_arr, cid) {
    const { ctx } = this;

    const res = await ctx.model.Category.findByPk(cid, { raw: true });
    if (res.pid == 0) {
      _arr.push(res);
    }

    if (res && res.pid > 0) {
      _arr.push(res);
      const _res = await this.queryParentCategory(_arr, res.pid);
    }

    return _arr;

  }
}

module.exports = CommonController;
