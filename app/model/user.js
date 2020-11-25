/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pwd: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    qq: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    openId: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wxNickName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    wxCity: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    wxSex: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
    vipIntegral: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
