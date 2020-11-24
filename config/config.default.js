/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.onerror= {
    // all(err, ctx) {
    //   // 在此处定义针对所有响应类型的错误处理方法
    //   // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
    //   ctx.body = '耗子尾汁';
    //   ctx.status = 500;
    // },
    html(err, ctx) {
      console.log('errorinfo ',err.status)
      // html hander
      ctx.body = '<h1>耗子尾汁</h1>';
      ctx.status = 404;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    },
  }

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1604974986714_6917';
  config.notfound={
    pageUrl: '/public/404.html',
  };
  // add your middleware config here
  config.middleware = [];
  // 开启 cors跨越
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
  };
  // 关闭 csrf跨域
  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.view = {
    // 遍历所有的.nj文件由nunjucks来处理
    mapping: {
      '.nj': 'nunjucks',
    },
    defaultExtension: '.nj', // 设置渲染的模板文件后缀是.nj 使用的时候可以略去
    defaultViewEngine: 'nunjucks', // 默认的渲染引擎
  };
  // 配置数据库
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    database: 'dg', // 数据库名
    host: 'home.yiker.cc',
    port: 3306,
    username: 'dg',
    password: 'iKnBTSrdFa37GetN',
    define: {
      underscored: false, // 禁止把下划线做间隔的表明转变成驼峰
      freezeTableName: true, // 冻结表名 意思是 sequelize会自动把表名添加负数，所以需要冻结避免被修改
      timestamps: false,
    },
  };
  // 使用redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
    },
  };
  // 短信验证码
  config.sms = {
    client: {
      accessKeyId: 'LTAI4G3rBdNi2m2q6oGoNZ95', // 阿里云的AccessKey 管理
      secretAccessKey: '5hss1fCpm2gBdyPRCtSvZS9HBZYQAi', // 阿里云的AccessKey 管理z中查看secret
    },
  };
  // 图片上传
  config.oss = {
    client: {
      accessKeyId: 'LTAI4G5HVtXZHHRreswemANk', // 阿里云账号
      accessKeySecret: '0UrW4PM2pz9JbYnM5Ab6EHOULtwavY',
      bucket: 'waht',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      timeout: '60s',
    },
  };

  // 启用Flie文件模式
  config.multipart = {
    mode: 'file',
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
