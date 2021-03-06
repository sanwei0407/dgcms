/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('vote', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    eTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    perLimit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    tableName: 'vote'
  });

  Model.associate = function() {

  }

  return Model;
};
