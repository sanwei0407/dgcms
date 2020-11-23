const Service = require('egg').Service;
const fs = require('fs'); // 引入node的文件处理模块
const util = require('utility'); // 引入一个工具库
class UserService extends Service {
  // @author 777
  // @last update 2020年11月12日 16:15
  // @公共的图片上传
  // fileList文件列表  type 文件类型
  async upload(){
    const { ctx } = this;
    const file = ctx.request.files[0];
    const ext = file.filename.split('.').pop(); // 得到文件后缀
    const _date = utils.YYYYMMDD('');
    const normalPath = `test/${_date}`; // 路径
    const newFileName = Date.now() + '.' + ext;
    try {
      // 处理文件，比如上传到云端
      await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);
      ctx.body = { suc: true, msg: 'http://47.106.22.167:5050/' + normalPath + '/' + newFileName };
    } catch (e) {
      ctx.body = { suc: false, msg: e };
    } finally {
      //await fs.unlinkSync(file.filepath);
    }

  }
}
module.exports = UserService;
