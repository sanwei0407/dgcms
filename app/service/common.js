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
    const _category = await app.model.Category.findAll({ where: { isNav: 1, isDelete: 0 }, order: [[ 'order', 'DESC' ]], attributes: {
      exclude: [ 'templateId', 'isDelete:', 'ctTemplateId', 'pid', 'isDelete', 'isSubmit', 'keyWord', 'desc', 'ctHtml' ],
    }, raw: true }); // 获取网站信息
    console.log('?????!!!', _category);


    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',siteInfo)
    app.locals.category = _category;
  }
}
module.exports = CommonService;
