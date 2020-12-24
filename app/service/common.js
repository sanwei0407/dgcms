const Service = require('egg').Service;
const fs = require('fs'); // 引入node的文件处理模块
const utils = require('utility'); // 引入一个工具库
class CommonService extends Service {

  // @author 777
  // @last update 2020年11月12日 16:15
  // @公共的图片上传
  // fileList文件列表  type 文件类型
  async upload(ctx, _type) {

    const file = ctx.request.files[0];
    const ext = file.filename.split('.').pop(); // 得到文件后缀
    const _date = utils.YYYYMMDD('');
    const type = _type ? _type : 'common';
    const normalPath = `${type}/${_date}`; // 路径
    const newFileName = Date.now() + '.' + ext;
    try {
      // 处理文件，比如上传到云端
      console.log('do upload to the oss');
      await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);
      console.log('end');
      //  todo 还要保存到附件表里面
      //
      return { success: true, msg: 'http://47.106.22.167:5050/' + normalPath + '/' + newFileName };//
    } catch (e) {
      console.log(e);
      return { success: false, msg: e };
    } finally {
      // await fs.unlinkSync(file.filepath);
    }

  }

  async getCommonData() {
    const { ctx, app } = this;
    // 栏目全局设置
    const _category = await app.model.Category.findAll({ where: { isNav: 1, isDelete: 0 }, order: [[ 'order', 'ASC' ], [ 'cid', 'ASC' ]], attributes: {
      exclude: [ 'templateId', 'isDelete:', 'ctTemplateId', 'isDelete', 'isSubmit', 'keyWord', 'desc', 'ctHtml' ],
    }, raw: true }); // 获取网站信息
    // 要考虑二级有二级分类的情况
    const _arr = _category.map(r => ({ ...r, children: [] }));
    _arr.forEach(r => {
      if (r.pid > 0) _arr.find(item => item.cid === r.pid).children.push(r);
    });

    _arr.splice(2, 0, { name: '场馆预约', seoUrl: '/book', pid: 0 });
    app.locals.category = _arr.filter(r => r.pid === 0);
    ctx.locals.zoneList = [
      { value: 1, label: '万秀区' },
      { value: 2, label: '长洲区' },
      { value: 3, label: '龙圩区' },
      { value: 4, label: '苍梧县' },
      { value: 5, label: '藤县' },
      { value: 6, label: '蒙山县' },
      { value: 7, label: '岑溪市' },
    ];
    ctx.locals.bookTypeList = [
      { value: 1, label: '文化场馆' },
      { value: 2, label: '体育场馆' },
      { value: 3, label: '旅游服务资源场馆' },
      { value: 4, label: '社会场馆' },
    ];

    const { uid, phone, state, realname } = ctx.session;
    console.log(ctx.session);
    if (uid) ctx.locals.uid = uid;
    if (phone) ctx.locals.phone = phone;
    if (state) ctx.locals.state = state;
    if (realname) ctx.locals.realname = realname;
  }
}
module.exports = CommonService;

