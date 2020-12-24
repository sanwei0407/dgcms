/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('zy', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    birthday: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    idfront: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    idback: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    qq: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    goodat: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    serverTime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    serverdir: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nums: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    teampic: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '1'
    },
    state: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    teamname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    peoples: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'zy'
  });

  Model.associate = function() {

  }

  return Model;
};
