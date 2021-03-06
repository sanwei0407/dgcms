/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('user', {
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: true
    },
    pwd: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    heardPhoto: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(4),
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
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    },
    vipIntegral: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0'
    },
    balance: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    isEnterprise: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    EnterpriseDesc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    realname: {
      type: DataTypes.STRING(50),
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
    idNum: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'user'
  });

  Model.associate = function() {

  }

  return Model;
};
