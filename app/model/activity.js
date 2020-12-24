/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('activity', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    brief: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(150),
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
    peopleLimit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    addresGps: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(50),
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
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bookStime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    bookEtime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'activity'
  });

  Model.associate = function() {

  }

  return Model;
};
