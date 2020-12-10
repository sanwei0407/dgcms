/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_payinfo', {
    payid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    orderid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    payplatform: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    platformnumber: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    platformstatus: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  }, {
    tableName: 'shop_payinfo',
  });

  Model.associate = function() {

  };

  return Model;
};
