'use strict';
module.exports = app => {
    const DataTypes = app.Sequelize;
    const { STRING, INTEGER, BIGINT } = DataTypes;
    // app.model.define("对应的表头",{字段},{其他配置})
    const Model = app.model.define('pm', {
        // 字段映射
        pmID: {
            type: INTEGER,
            primaryKey: true,   // 是否是主键
            autoIncrement: true,    // 是否自增
            allowNull: false,   // 是否允许为null
        },
        fromID: INTEGER,           // 发消息人的id
        toID: INTEGER,             // 接收的人的 id
        msg: STRING,               // 信息的内容
        sentTime: BIGINT,          // 发送的时间
        readTime: BIGINT,          // 接收的人阅读的时间
        isread: INTEGER,           // 是否已读
        type: INTEGER,             // 私信类型
        canRead: INTEGER,          // 是否已删除
        imgUrl: STRING,            // 上传图片的地址
    }, {
        timestamps: false,
        // 配置项
    });


    return Model;
};