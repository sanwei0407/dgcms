const Service = require('egg').Service;
const fs = require('fs'); // 引入node的文件处理模块
const util = require('utility'); // 引入一个工具库
class ImagesService extends Service {
  // @author 777
  // @last update 2020年11月12日 16:15
  // @公共的图片上传
  // fileList文件列表  type 文件类型
  async upload(file, type) {
    const { ctx } = this;
    const path = type ? type : 'common';
    const ext = file.filename.split('.').pop(); // 得到文件后缀
    const _date = util.YYYYMMDD('');
    const normalPath = `${path}/${_date}`; // 路径
    const newFileName = Date.now() + '.' + ext;
    try {
      // 处理文件，比如上传到云端
      await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);
      // 保存到数据库
      try {
        await ctx.model.Attachment.create({
          url: 'http://oss.1775.net.cn/' + normalPath + '/' + newFileName,
          addTime: Date.now(),
          type: path,
        });
      } catch (e) {
        return { e };
      }
      return { suc: true, url: 'http://oss.1775.net.cn/' + normalPath + '/' + newFileName };
    } catch (e) {
      return { suc: false, msg: e };
    } finally {
      await fs.unlinkSync(file.filepath);
    }
  }
}
module.exports = ImagesService;
