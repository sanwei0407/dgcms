/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('article', {
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    from: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    top: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    tag: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isHot: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    whoCanRead: {
      type: DataTypes.STRING(125),
      allowNull: true
    },
    reading: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    contentSummary: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    pdf: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    music: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'article'
  });

  Model.associate = function() {

  }

  return Model;
};
