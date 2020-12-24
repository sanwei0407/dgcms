/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_recemsg', {
    shoppingid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    orderid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    recename: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    recephone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    recemobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receprovince: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    rececity: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    recedistrict: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receaddress: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    createtime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'shop_recemsg'
  });

  Model.associate = function() {

  }

  return Model;
};
