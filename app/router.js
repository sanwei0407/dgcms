'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/*', controller.client.common.abc)

  // 会员规则管理
  router.post('/addvipRule', controller.admin.vipRule.addvipRule); // 添加会员等级+对应的规则
  router.post('/delvipRule', controller.admin.vipRule.delvipRule); // 添加会员等级+对应的规则
  router.post('/findvipRule', controller.admin.vipRule.findvipRule); // 添加会员等级+对应的规则
  router.post('/editvipRule', controller.admin.vipRule.editvipRule); // 添加会员等级+对应的规则


  // 管理员的接口
  router.post('/editAdmin', controller.admin.admin.editAdmin); // 管理员修改（编辑）密码
  router.post('/loginAdmin', controller.admin.admin.loginAdmin); // 管理员登录接口
  router.post('/addAdmin', controller.admin.admin.addAdmin); // 管理员注册(增加)的接口
  router.post('/groupAdmin', controller.admin.admin.groupAdmin); // 管理员注册(增加)的接口
  router.post('/smsCode', controller.admin.admin.smscode); // 发送短信验证码（暂时不用）
  router.post('/checkSms', controller.admin.admin.checkSms); // 校验短信验证码（暂时不用）
  router.post('/delAdmin', controller.admin.admin.delAdmin); // 校验短信验证码（暂时不用）

  // 前后台共用用户的接口--common
  router.post('/common/addUser', controller.common.addUser); // 用户注册（增加）的接口
  router.post('/common/delUser', controller.common.delUser); // 用户删除的接口

  // 后台用户的接口
  router.post('/admin/editUser', controller.admin.user.AdEditUser); // 用户编辑的接口
  router.post('/admin/findUserList', controller.admin.user.AdFindUserList); // 用户查询所有数据的接口
  router.post('/admin/findOneUser', controller.admin.user.AdFindOneUser); // 查询单个用户信息的接口

  // 用户的接口
  router.post('/editUser', controller.client.user.editUser); // 用户编辑的接口
  router.post('/findOneUser', controller.client.user.findOneUser); // 查询单个用户信息的接口
  router.post('/userLogin', controller.client.user.userLogin); // 用户登录的接口

  // 文章接口
  router.post('/addArt', controller.admin.article.addArt); // 添加文章
  router.post('/delArt', controller.admin.article.delArt); // 删除文章
  router.post('/findArtList', controller.admin.article.findArtList); // 查找文章
  router.post('/findOneArt', controller.admin.article.findOneArt); // 查找单个文章
  router.post('/reviceArt', controller.admin.article.reviceArt); // 编辑文章

  // 栏目接口
  router.post('/categoryadd', controller.admin.category.categoryadd); // 添加栏目内容
  router.post('/categoryupdate', controller.admin.category.categoryupdate); // 更改栏目内容
  router.post('/categorydel', controller.admin.category.categorydel); // 软删除栏目内容
  router.post('/categoryfindall', controller.admin.category.categoryfindall); // 查所有栏目内容
  router.post('/getcategoryOne', controller.admin.category.getcategoryOne); // 查单个栏目的内容

  // 预约的接口
  router.post('/addbook', controller.client.book.addbook); // 添加预约
  router.post('/delbook', controller.client.book.delbook); // 软删除预约
  router.post('/findOneBook', controller.client.book.findOneBook); // 查单个预约
  router.post('/findAllBook', controller.client.book.findAllBook); // 查所有预约
  router.post('/editBook', controller.client.book.editBook); // 编辑预约

  // pm 私信
  router.post('/adminSent', controller.admin.pm.adminSent); // 管理员发送信息
  router.post('/userSent', controller.admin.pm.userSent); // 管理员发送信息
  router.post('/getPmList', controller.admin.pm.getPmList); // 得到聊天记录


  // 活动发布的接口
  router.post('/addActivity', controller.admin.activity.addActivity); // （添加）活动发布的接口
  router.post('/delActivity', controller.admin.activity.delActivity); // （删除）活动发布的接口
  router.post('/editActivity', controller.admin.activity.editActivity); // （编辑）活动发布的接口
  router.post('/findActivity', controller.admin.activity.findActivity); // （查询全部）活动发布信息的接口
  router.post('/findOneActivity', controller.admin.activity.findOneActivity); // （查询单个）活动发布信息的接口

  // 系统基本参数的接口
  router.post('/addBP', controller.admin.baseParameter.addBP); // （添加）添加系统参数的接口
  router.post('/delBP', controller.admin.baseParameter.delBP); // （删除）删除系统参数的接口
  router.post('/reviceBP', controller.admin.baseParameter.reviceBP); // （编辑）修改系统参数的接口
  router.post('/findBP', controller.admin.baseParameter.findBP); // （查询全部）查询系统参数的接口

  // 投票接口
  router.post('/addVote', controller.admin.vote.addVote); // 添加投票
  router.post('/delVote', controller.admin.vote.delVote); // 删除投票
  router.post('/findVoteList', controller.admin.vote.findVoteList); // 查找投票
  router.post('/findOneVote', controller.admin.vote.findOneVote);// 查找单个投票
  router.post('/reviceVote', controller.admin.vote.reviceVote);// 编辑投票

  //投票选项接口
  router.post('/addVoteitem', controller.admin.voteitem.addVoteitem); // 添加投票
  router.post('/delVoteitem', controller.admin.voteitem.delVoteitem); // 删除投票
  router.post('/findVoteitemList', controller.admin.voteitem.findVoteitemList); // 查找投票
  router.post('/findOneVoteitem', controller.admin.voteitem.findOneVoteitem);// 查找单个投票
  router.post('/reviceVoteitem', controller.admin.voteitem.reviceVoteitem);// 编辑投票


  //投票日志
  router.post('/addVoteLog', controller.admin.voteLog.addVoteLog); // 添加投票
  // 广告接口 (缩写:ad)
  router.post('/addad', controller.admin.ad.addad); // 添加广告
  router.post('/adFindAll', controller.admin.ad.adFindAll); // 查找广告
  router.post('/adUpload', controller.admin.ad.adUpload); // 上传广告图片
  router.post('/delAd', controller.admin.ad.delAd); // 删除广告
  router.post('/reviceAd', controller.admin.ad.reviceAd); // 修改广告
  router.post('/findOneAd', controller.admin.ad.findOneAd); // 修改广告

  // node.js的操作
  router.post('/getDirTree', controller.admin.common.getDirTree); // node读取文件夹中的文件目录信息
  router.post('/readFileContent', controller.admin.common.readFileContent); // node读取文件夹中的文件信息
  router.post('/writeFileContent', controller.admin.common.writeFileContent); // node修改文件内容
  router.post('/addFile', controller.admin.common.addFile); // node.js添加文件
  router.post('/addDir', controller.admin.common.addDir); // node.js添加文件夹
  router.post('/delFile', controller.admin.common.delFile); // node.js添加文件夹
  router.post('/delDir', controller.admin.common.delDir); // node.js添加文件夹
  router.post('/renameFile', controller.admin.common.renameFile); // node.js添加文件夹
  router.post('/renameDir', controller.admin.common.renameDir); // node.js添加文件夹
  router.get('/pinyin', controller.admin.common.pinyin); // 参考例子-模版-栏目-主题色

  // 友情链接（赞助商sponsor）
  router.post('/addSponsor', controller.admin.sponsor.addSponsor); // 添加赞助商
  router.post('/delSponsor', controller.admin.sponsor.delSponsor); // 删除赞助商
  router.post('/findAllSponsor', controller.admin.sponsor.findAllSponsor); // 查找所有赞助商
  router.post('/updataSponsor', controller.admin.sponsor.updataSponsor); // 修改赞助商信息
  // 4 test
  router.get('/test', controller.test.aa);

  // 通用模块
  router.post('/attachment/upload', controller.common.upload); // 附近上传模块
  router.get('/', controller.admin.common.abc); // 首页
  router.get('/*', controller.admin.common.abc); // 参考例子-模版-栏目-主题色



};