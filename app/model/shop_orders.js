/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_orders', {
    orderid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    shoppingid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    paymenttype: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    postage: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    paymenttime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sendtime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    endtime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    closetime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    createtime: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'shop_orders'
  });

  Model.associate = function() {

  }

  return Model;
};
