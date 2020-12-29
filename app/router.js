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
  router.post('/findAdmin', controller.admin.admin.findAdmin); // 管理员(查询)的接口
  router.post('/findOneAdmin', controller.admin.admin.findOneAdmin); // 通过groupId查询管理员数据中是否还存在
  router.post('/smsCode', controller.admin.admin.smscode); // 发送短信验证码（暂时不用）
  router.post('/checkSms', controller.admin.admin.checkSms); // 校验短信验证码（暂时不用）
  router.post('/delAdmin', controller.admin.admin.delAdmin); // 校验短信验证码（暂时不用）

  // 管理员的权限接口
  router.post('/addRole', controller.admin.role.addRole); // 增加权限的接口
  router.post('/findRole', controller.admin.role.findRole); // 查询权限的接口
  router.post('/findPid', controller.admin.role.findPid); // 通过id号找对应自己的pid(父亲找儿子)
  router.post('/findOneRole', controller.admin.role.findOneRole); // 通过id查询权限详情的接口
  router.post('/delRole', controller.admin.role.delRole); // 删除权限的接口
  router.post('/addGroup', controller.admin.group.addGroup); // 增加角色的接口
  router.post('/findGroup', controller.admin.group.findGroup); // 查询角色的接口
  router.post('/findOneGroup', controller.admin.group.findOneGroup); // 通过groupId查询角色详情的接口
  router.post('/findNameGroup', controller.admin.group.findNameGroup); // 通过name查询角色详情的接口
  router.post('/delGroup', controller.admin.group.delGroup); // 删除角色的接口
  router.post('/editGroup', controller.admin.group.editGroup); // 编辑角色的接口

  // 前后台共用用户的接口--common
  router.post('/common/addUser', controller.common.addUser); // 用户注册登录（增加）的接口
  router.post('/common/delUser', controller.common.delUser); // 用户删除的接口

  // 后台用户的接口
  router.post('/admin/editUser', controller.admin.user.AdEditUser); // 用户编辑的接口
  router.post('/admin/findUserList', controller.admin.user.AdFindUserList); // 用户查询所有数据的接口
  router.post('/admin/findOneUser', controller.admin.user.AdFindOneUser); // 查询单个用户信息的接口

  // 用户的接口
  router.post('/editUser', controller.client.user.editUser); // 用户编辑的接口
  router.post('/findOneUser', controller.client.user.findOneUser); // 查询单个用户信息的接口

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
  router.post('/searchPosition', controller.admin.activity.searchPosition); // （查询单个）活动发布信息的接口
  router.post('/getPosition', controller.admin.activity.getPosition); // （查询单个）活动发布信息的接口

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

  // 投票选项接口
  router.post('/addVoteitem', controller.admin.voteitem.addVoteitem); // 添加投票
  router.post('/delVoteitem', controller.admin.voteitem.delVoteitem); // 删除投票
  router.post('/findVoteitemList', controller.admin.voteitem.findVoteitemList); // 查找投票
  router.post('/findOneVoteitem', controller.admin.voteitem.findOneVoteitem);// 查找单个投票
  router.post('/reviceVoteitem', controller.admin.voteitem.reviceVoteitem);// 编辑投票


  // 投票日志
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
  router.get('/book', controller.booking.pcindex); // 场馆预pc
  router.get('/book/:id', controller.booking.pcdetail); // 场馆预pc
  router.post('/common/editorupload', controller.common.editorupload); // wing ue 文件上传


  router.all('/register', controller.user.register); // pc注册
  router.all('/login', controller.user.login); // pc登录
  router.get('/quit', controller.user.quit); // 退出
  router.get('/uc', controller.user.uc); // 用户中心
  router.get('/auth', controller.user.auth); // 实名验证
  router.post('/user/verify', controller.user.verify); // 提及实名验证
  router.all('/user/single', controller.user.single); // 个人志愿者注册
  router.all('/user/team', controller.user.team); // 个人志愿者注册
  router.all('/user/artteam', controller.user.artteam); // 文艺团队
  router.all('/user/createteam', controller.user.createteam); // 创建团队
  router.all('/user/publish', controller.user.publish); // 内容发布
  router.all('/user/editArticle/:aid', controller.user.editArticle); // 编辑文章内容
  router.all('/user/book', controller.user.book); // 场馆预约
  router.all('/user/activity', controller.user.activity); // 场馆预约
  // 招聘信息接口
  router.post('/addJod', controller.client.jod.addJod);// 添加招聘信息
  router.post('/delJod', controller.client.jod.delJod);// 删除招聘信息
  router.post('/findAllJod', controller.client.jod.findAllJod);// 查找所有招聘信息
  router.post('/findOneJod', controller.client.jod.findOneJod); // 查询单个招聘信息接口
  router.post('/editJod', controller.client.jod.editJod);// 编辑招聘信息
  // 招聘类型接口
  router.post('/addJobType', controller.client.jobtype.addJobType);// 编辑招聘类型信息
  router.post('/delJobType', controller.client.jobtype.delJobType);// 删除招聘类型信息 软删除
  router.post('/destroyJobType', controller.client.jobtype.destroyJobType);// 删除招聘类型信息 直接删除
  router.post('/getJobTypeList', controller.client.jobtype.getJobTypeList);// 获取全部的分类
  router.post('/updateJobType', controller.client.jobtype.updateJobType);// 修改分类信息


  // 跳蚤市场信息接口
  router.post('/addMarket', controller.client.market.addMarket);// 添加跳蚤市场信息
  router.post('/delMarket', controller.client.market.delMarket);// 删除跳蚤市场信息
  router.post('/findAllMarket', controller.client.market.findAllMarket);// 查找跳蚤市场信息
  router.post('/findOneMarket', controller.client.market.findOneMarket); // 查询单个跳蚤市场信息
  router.post('/editMarket', controller.client.market.editMarket); // 编辑跳蚤市场信息
  // 二手商品类型的接口
  router.post('/addMarketType', controller.client.marketType.addMarketType); // 增加二手分类
  router.post('/delMarketType', controller.client.marketType.delMarketType); // 删除二手分类
  router.post('/updateMarketType', controller.client.marketType.updateMarketType); // 修改二手分类信息
  router.post('/getMarketType', controller.client.marketType.getMarketType); // 获取二手分类列表

  // 房屋租聘信息接口
  router.post('/addHouse', controller.client.house.addHouse);// 添加房屋租聘信息
  router.post('/delHouse', controller.client.house.delHouse);// 删除房屋租聘信息
  router.post('/findAllHouse', controller.client.house.findAllHouse);// 查找房屋租聘信息
  router.post('/findOneHouse', controller.client.house.findOneHouse); // 查询单个房屋租聘信息
  router.post('/editHouse', controller.client.house.editHouse); // 编辑房屋租聘信息

  // 服务接口
  router.post('/addServers', controller.client.servers.addServers);// 添加服务信息
  router.post('/delServers', controller.client.servers.delServers);// 删除服务信息
  router.post('/findAllServers', controller.client.servers.findAllServers);// 查找所有服务信息
  router.post('/findOneServers', controller.client.servers.findOneServers); // 查询单个服务信息
  router.post('/editServers', controller.client.servers.editServers); // 编辑服务信息

  // 服务类型接口
  router.post('/addServeType', controller.client.serveType.addServeType);// 添加服务类型
  router.post('/delServeType', controller.client.serveType.delServeType);// 删除服务类型
  router.post('/updateServeType', controller.client.serveType.updateServeType);// 更改服务类型信息
  router.post('/getServeTypeList', controller.client.serveType.getServeTypeList);// 获取服务类型列表

  // 电商订单接口
  router.post('/shopOrdersAdd', controller.shop.shoporders.shopOrdersAdd);// 创建订单
  router.post('/shopOrdersFind', controller.shop.shoporders.shopOrdersFind);// 查询所有订单
  router.post('/appOrdersFind', controller.shop.shoporders.appOrdersFind);// 查询所有订单（前端用）
  router.post('/shopOrdersDel', controller.shop.shoporders.shopOrdersDel);// 软删除订单
  router.post('/shopOrdersUpdate', controller.shop.shoporders.shopOrdersUpdate);// 修改订单

  // 支付信息接口
  router.post('/shopPayinfoAdd', controller.shop.shoppayinfo.shopPayinfoAdd);// 支付信息存放入表

  // 电商商品接口
  router.post('/shopProductAdd', controller.shop.shopproduct.shopProductAdd);// 新增商品
  router.post('/shopProductDel', controller.shop.shopproduct.shopProductDel);// 删除商品
  router.post('/shopProductUpdate', controller.shop.shopproduct.shopProductUpdate);// 修改商品信息
  router.post('/shopProductFind', controller.shop.shopproduct.shopProductFind);// 查询全部商品
  router.post('/appProductFind', controller.shop.shopproduct.appProductFind);// 查询全部商品（前端用）
  router.post('/shopProductFindOne', controller.shop.shopproduct.shopProductFindOne);// 根据proid查询商品信息
  router.post('/appProductFindOne', controller.shop.shopproduct.appProductFindOne);// 根据proid查询商品信息（前端用）

  // 电商订单明细接口
  router.post('/addOrderit', controller.shop.orderitem.addOrderit); // 添加订单明细
  router.post('/delOrderit', controller.shop.orderitem.delOrderit); // 删除订单明细表
  router.post('/findOitList', controller.shop.orderitem.findOitList); // 查找订单明细表
  router.post('/findOnelist', controller.shop.orderitem.findOnelist); // 查找单个订单明细
  router.post('/reviceOit', controller.shop.orderitem.reviceOit); // 编辑订单明细

  // 电商购物车接口
  router.post('/addCar', controller.shop.shopcart.addCar); // 添加购物车
  router.post('/delCar', controller.shop.shopcart.delCar); // 删除购物车
  router.post('/findCartList', controller.shop.shopcart.findCartList); // 查找购物车
  router.post('/findOnecart', controller.shop.shopcart.findOnecart); // 查询单个购物车表
  router.post('/reviceCart', controller.shop.shopcart.reviceCart); // 编辑购物车信息

  // 电商商品类别接口
  router.post('/addClassify', controller.shop.shopclassify.addClassify); // 编辑购物车信息
  router.post('/delClassify', controller.shop.shopclassify.delClassify); // 删除商品类别
  router.post('/findClassify', controller.shop.shopclassify.findClassify); // 查找商品类别
  router.post('/findOneify', controller.shop.shopclassify.findOneify); // 查询单个商品类别
  router.post('/reviceify', controller.shop.shopclassify.reviceify); // 编辑商品类别

  // 电商收货信息接口
  router.post('/addrece', controller.shop.shoprecemsg.addrece); // 添加收货人信息
  router.post('/delrece', controller.shop.shoprecemsg.delrece); // 删除收货人信息
  router.post('/findrece', controller.shop.shoprecemsg.findrece); // 查找收货人信息
  router.post('/findOnerece', controller.shop.shoprecemsg.findOnerece); // 查找单个收货人信息
  router.post('/reviceRece', controller.shop.shoprecemsg.reviceRece); // 编辑收货人信息

  // 余额信息接口
  router.post('/journalAdd', controller.shop.journal.journalAdd); // 添加余额变化信息
  router.post('/journalFind', controller.shop.journal.journalFind); // 查询余额变化信息


  // 场地预定接口
  router.post('/book/list', controller.booking.list); // 场馆列表
  router.post('/book/create', controller.booking.create); // 场馆创建
  router.post('/book/delete', controller.booking.delete); // 场馆删除
  router.post('/book/getone', controller.booking.getOne); // 获取一个场馆的信息
  router.post('/book/update', controller.booking.update); // 更新场馆信息

  // 数据汇总接口
  // router.post('/findweekusers',controller.client.user.findweekusers) // 添加汇总数据

  // api 接口
  router.get('/api/myteam', controller.api.myteam);
  router.get('/api/teamarticle', controller.api.teamarticle);
  router.post('/api/deleArticle', controller.api.deleArticle);
  router.post('/api/joinac', controller.api.joinac);
  router.get('/api/activity', controller.api.activity);
  router.post('/api/addBook', controller.api.addBook);
  router.get('/api/mybook', controller.api.mybook);


  router.post('/activity/list', controller.api.aclist);


  router.post('/api/acticleList', controller.api.acticleList);// 获取文章内容
  // 手机api
  router.post('/mapi/acticleList', controller.mapi.acticleList);
  router.post('/mapi/article/detail', controller.mapi.acdetail);
  router.post('/mapi/acdetail', controller.mapi.activityDetail);

  router.get('/*', controller.admin.common.abc); // 参考例子-模版-栏目-主题色

};
