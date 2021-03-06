/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_orderitem', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    orderid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    proid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    proname: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    proimage: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    currentunitprice: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    totalprice: {
      type: DataTypes.DECIMAL,
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
    tableName: 'shop_orderitem'
  });

  Model.associate = function() {

  }

  return Model;
};
