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
    let url = ctx.req.url; // 得到请求的url
    url = url.split('?')[0];
    let templateDir = ''; // 渲染的模板

    // 渲染首页的情况
    if (url === '/') {

      const indexData = await this._getIndexData();

      ctx.locals.news = indexData.news;
      ctx.locals.activity = indexData.activity;


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
    ctx.locals.nextPage = page * 1 + 1;
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

      if (cate) {
        const _tp = cate.templateId;
        templateDir = _tp;
        // 列表页面处理流程
        const limit = 6;
        const offset = limit * (page - 1);
        await ctx.model.Article.belongsTo(ctx.model.Category, { targetKey: 'cid', foreignKey: 'cid' });
        let _cid;
        const { Op } = app.Sequelize;
        if (cate.type == 1) {
          const _cids = await ctx.model.Category.findAll({
            where: {
              pid: cate.cid,
            },
            attributes: [ 'cid' ],
            raw: true,
          });
          _cid = { [Op.in]: _cids.map(r => r.cid) };
        } else {
          _cid = cate.cid;
        }
        const _article = await app.model.Article.findAll({ where: {
          cid: _cid,
        },
        offset,
        limit,
        include: [{
          model: ctx.model.Category,
        },
        ] });

        // 生成分页信息
        const _count = await app.model.Article.count({ where: {
          cid: _cid,
          isDelete: 0,
        } });
        const maxPage = Math.ceil(_count / limit);
        const pagation = [];
        for (let i = 0; i < maxPage; i++) {
          pagation.push({ page: i + 1, url: `${cate.seoUrl}/page/${i + 1}` });
        }
        ctx.locals.pagation = pagation;

        // 取得热门的5条内容
        await this.getHotList(cate); // 热门消息
        // 如果是文化活动取出活动的内容

        if (path === '/wenhuahuodong' || path === '/wenhuahuodong/yugao') {
          await this.handleActivity(page);
        }


        if (path === '/wenhuafuwu/fuwu/huodong') {
          await this.handleZyAc(page);
        }


        // 如果是投票  加载投票内容

        if (path.includes('toupiao')) {
          const voteList = await ctx.model.Vote.findAll({
            order: [ 'id', 'DESC' ],
          });
          ctx.locals.voteList = voteList;
        }

        // 获取下级栏目

        const topcid = await this._getTopCid(cate);


        const subCates = ctx.locals.category.find(r => r.cid == topcid);
        console.log('topcid', subCates);
        ctx.locals.subCates = subCates.children;
        ctx.locals.topcid = topcid;

        // 生成面包屑菜单
        // 生成面包屑菜单
        await this._getBreakNum(cate);
        // 生成面包屑菜单 end
        ctx.locals.articleList = _article;
        ctx.locals.cate = cate;
        ctx.locals.title = cate.name;
        ctx.locals.fenlei = cate.tags ? cate.tags.split(',').filter(r => r.trim()) : '';
      }

    }

    // 内容页处理流程
    if (isDetailPage) {
      let type = 'article';

      const aid = path.match(/\/\d+$/)[0].replace('/', ''); // 内容id
      const lk = path.split('/' + aid)[0];
      if (lk === '/wenhuahuodong' || lk === '/wenhuafuwu/fuwu/huodong') type = 'activity';


      // 获取文章详情
      if (type === 'article') {
        const article = await ctx.model.Article.findByPk(aid);
        // 进入文章详情后让文章（article）的阅读量 + 1
        article.increment('reading', { by: 1 });
        const cate = await ctx.model.Category.findByPk(article.cid);
        ctx.locals.cate = cate;
        ctx.locals.article = article;

        ctx.locals.title = cate.name + '_' + article.title;
        const _tp = cate.ctTemplateId; // 获取内容模板 todo ctTemplateId 变量名语义不清晰
        templateDir = _tp;
        await this.getHotList(cate); // 热门消息
        // 生成面包屑菜单
        await this._getBreakNum(cate);

        // 把内容进行切割
        const ct = article.content;
        const _temarr = await this.splitStr(ct);
        const _temarr2 = [];
        for (let i = 0; i < _temarr.length; i = i + 2) {
          _temarr2.push([ _temarr[i], _temarr[i + 1] ]);
        }

        ctx.locals.ctarr = _temarr2;


      }
      if (type === 'activity') {
        // 考虑活动内容
        templateDir = 'theme/default/detail_activity.nj';
        const activity = await ctx.model.Activity.findByPk(aid, {
          raw: true,
        });
        let state = 0;
        const now = Date.now();
        const { uid } = ctx.session;
        if (uid) {
          const action = await ctx.model.Actions.findOne({
            uid,
            activityId: aid,
          });
          console.log('the action is ', action);
          if (action) state = 5;
        }
        if (now < activity.bookStime) state = 0;// 即将开始预约
        if (now > activity.bookStime && now < activity.bookEtime) state = 1;// 开始预约
        if (now > activity.bookEtime && now < activity.sTime) state = 2; // 即将开始
        if (now > activity.sTime && now < activity.eTime) state = 3;
        if (now > activity.eTime) state = 4;
        ctx.locals.state = state;


        ctx.locals.activity = activity;
        ctx.locals.title = activity.title;
      }


    }


    if (templateDir) await ctx.render(templateDir); // 最终渲染


  }

  async _getBreakNum(cate) {
    const { ctx } = this;
    const innerNav = [];
    let _temCate = cate;
    innerNav.unshift(_temCate);
    do {
      _temCate = await ctx.model.Category.findOne({
        where: {
          cid: _temCate.pid,
        },
        raw: true,
        attributes: [ 'cid', 'name', 'seoUrl', 'pid' ],
      });
      innerNav.unshift(_temCate);

    } while (_temCate && _temCate.pid > 0);
    // 最后加上首页
    innerNav.unshift({ seoUrl: '/', name: '首页' });
    ctx.locals.innerNav = innerNav.filter(r => r);
  }
  async getHotList(cate) {
    const { ctx } = this;
    const _hotList = await ctx.model.Article.findAll({
      where: {
        cid: cate.cid,
      },
      limit: 20,
      order: [[ 'isHot', 'DESC' ], [ 'aid', 'DESC' ]],
    });
    ctx.locals.hotList = _hotList;
  }

  async handleActivity(page) {
    const { ctx } = this;
    const limit = 3;
    const offset = (page - 1) * limit;
    const { type } = ctx.query;
    const where = {};
    if (type) where.type = type;
    const activitys = await ctx.model.Activity.findAll({
      where,
      limit,
      offset,
    });

    ctx.locals.typeList = [
      { value: 1, label: '展览' },
      { value: 2, label: '赛事' },
      { value: 3, label: '培训' },
      { value: 4, label: '演出' },
      { value: 5, label: '讲座' },
      { value: 6, label: '公益' },
    ];
    ctx.locals.activitys = activitys;
    const _count = await ctx.model.Activity.count({ where: {
      isDelete: 0,
    } });
    const maxPage = Math.ceil(_count / limit);
    const pagation = [];
    for (let i = 0; i < maxPage; i++) {
      pagation.push({ page: i + 1, url: `/wenhuahuodong/page/${i + 1}` });
    }
    ctx.locals.pagation = pagation;

  }


  async handleZyAc(page) {
    const { ctx } = this;
    const limit = 10;
    const offset = (page - 1) * limit;
    const { type } = ctx.query;
    const where = {};
    if (type) where.type = type;
    const activitys = await ctx.model.Activity.findAll({
      where,
      limit,
      offset,
    });

    ctx.locals.typeList = [
      { value: 1, label: '展览' },
      { value: 2, label: '赛事' },
      { value: 3, label: '培训' },
      { value: 4, label: '演出' },
      { value: 5, label: '讲座' },
      { value: 6, label: '公益' },
    ];
    ctx.locals.activitys = activitys;
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
  // 获取首页需要的信息
  async _getIndexData() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const news = await ctx.model.Article.findAll({
      where: {
        cid: {
          [Op.in]: [ 64, 63, 81, 82 ],
        },
        cover: {
          [Op.not]: null,
        },
        isDelete: 0,
      },
      limit: 4,
      order: [[ 'top', 'DESC' ], [ 'aid', 'DESC' ]],
      raw: true,
    });
    const book = await ctx.model.Booking.findAll({
      order: [[ 'id', 'DESC' ]],
      limit: 6,
    });
    ctx.locals.book = book;
    const activity = await ctx.model.Activity.findAll({
      order: [ 'id', 'DESC' ],
      limit: 4,
    });

    // 获取推送的内容


    await ctx.model.Push.belongsTo(ctx.model.Article, { targetKey: 'aid', foreignKey: 'articleId' });
    const _pushData = await ctx.model.Push.findAll({
      order: [[ 'order', 'DESC' ]],
      type: 1,
      include: [ ctx.model.Article ],
    });

    const pushData = [
      _pushData.filter(r => r.place == 1),
      _pushData.filter(r => r.place == 2),
      _pushData.filter(r => r.place == 3),
      _pushData.filter(r => r.place == 4),

    ];
    ctx.locals.pushData = pushData;

    console.log('pushData', pushData);

    return { news, activity };
  }

  // findTop cateid
  async _getTopCid(cate) {
    const { ctx } = this;
    let topcid = 0;
    let nowpid = cate.pid;
    if (nowpid == 0) {
      topcid = cate.cid;
    } else {
      while (nowpid != 0) {
        const res = await ctx.model.Category.findOne({
          where: {
            cid: nowpid,
          },
          raw: true,
        });
        nowpid = res.pid;
        topcid = res.cid;
      }
    }

    return topcid;

  }


  async splitStr(_str) {

    const str = _str.replace(/<img.*\/?>/ig, '');
    console.log('str', str);
    if (str.length < 400) {
      const rs = [];
      rs[0] = str;
      return rs;
    }
    const size = 400;
    const count = Math.ceil(str.length / size);
    const rs = [];
    for (let i = 0; i <= count; i++) {
      if (i === 0) {
        rs.push(str.substring(i, size));
      } else if (i > 0 && i < count) {
        rs.push(str.substring((i * size) + 1, (i + 1) * size));
      } else {
        rs.push(str.substring((i * size) + 1, str.length - 1));
      }
    }
    return rs;

  }
}

module.exports = CommonController;
