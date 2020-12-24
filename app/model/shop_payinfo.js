/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_payinfo', {
    payid: {
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
    payplatform: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    platformnumber: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    platformstatus: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    createtime: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'shop_payinfo'
  });

  Model.associate = function() {

  }

  return Model;
};
