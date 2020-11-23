const path = require('path');
// app.js
class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    // 此时 config 文件已经被读取并合并，但是还并未生效
    // 这是应用层修改配置的最后时机
    // 注意：此函数只支持同步调用
    this.app.loader.loadFile(path.join(this.app.baseDir, 'app/bootstrap/index.js'));
    const ctx = this.app.createAnonymousContext();
    this.app.nunjucks.addExtension('remote', new remote(ctx));
    this.app.nunjucks.addExtension('ad', new ad(ctx));
    this.app.nunjucks.addExtension('foot', new foot(ctx));
    this.app.nunjucks.addExtension('head', new head(ctx));
    this.app.nunjucks.addExtension('article', new article(ctx));
    this.app.nunjucks.addFilter('time', function(res) {
      const _d = new Date(res);
      const year = _d.getFullYear();
      const m = `${_d.getMonth() + 1}`.padStart(2, 0);
      const d = `${_d.getDate()}`.padStart(2, 0);
      return `${year}-${m}-${d}`;
    });
    this.app.nunjucks.addFilter('quiteHtml', function(res) {
      return res.replace(/<.*?>/g, '');
    });


  }
  async willReady() {
    const { app, ctx } = this;
    // 所有的插件都已启动完毕，但是应用整体还未 ready
    // 可以做一些数据初始化等操作，这些操作成功才会启动应用
    const { router, controller } = this.app;
    // 例如：从数据库加载数据到内存缓存
    // router.get('/abc',controller.home.category)
    this.app.temDir = '/theme/default';
    // 系统全局设置
    const _siteInfo = await app.model.BaseParameter.findAll(); // 获取网站信息
    const siteInfo = {};
    for (const item of _siteInfo) {
      siteInfo[item.key] = item.value;
    }
    app.locals.siteInfo = siteInfo;


    // // 栏目全局设置
    // const _category = await app.model.Category.findAll({where:{isNav:1},order:[['order','DESC']], attributes: {
    //   exclude: [ 'templateId','isDelete:','ctTemplateId','pid' ,'isDelete','isSubmit','keyWord','desc','ctHtml'],
    // },raw:true}); // 获取网站信息
    // // console.log('?????!!!',_category)


    // console.log('qweqwtasdas!!!!!!!',_category)
    // // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',siteInfo)
    // app.locals.category = _category;
  }
}
module.exports = AppBootHook;
