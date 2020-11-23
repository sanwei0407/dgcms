'use strict';
module.exports = app => {
  const DataTypes = app.Sequelize;
  const { STRING, INTEGER, BIGINT } = DataTypes;
  // app.model.define("对应的表头",{字段},{其他配置})
  const Model = app.model.define('sponsor', {
    // 字段映射
    id: {
      type: INTEGER,
      primaryKey: true, // 是否是主键
      autoIncrement: true, // 是否自增
      allowNull: false, // 是否允许为null
    },
    url: STRING, // 赞助跳转的链接
    name: STRING, // 赞助商的名字
    type: INTEGER, // 赞助内容的类型， 1=>图文、 2=>文字
    imgurl: STRING, // 显示的赞助商提供的图片地址
    order: INTEGER, // 权重
    isdelete: INTEGER, // 是否删除
  }, {
    timestamps: false,
    // 配置项
  });


  return Model;
};
