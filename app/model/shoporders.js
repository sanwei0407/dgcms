/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_orders', {
    orderid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    shoppingid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    payment: {
      type: DataTypes.DECIMAL(20),
      allowNull: true,
    },
    paymenttype: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    postage: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    paymenttime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    sendtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    closetime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'shop_orders',
  });

  Model.associate = function() {

  };

  return Model;
};
