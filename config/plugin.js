'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 解决跨域方法
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  // redis服务器
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  // 短信验证码
  sms: {
    enable: true,
    package: 'egg-sms',
  },
  oss: {
    enable: true,
    package: 'egg-oss',
  },
};
