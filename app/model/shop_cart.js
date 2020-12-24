/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_cart', {
    carid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    proid: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    checked: {
      type: DataTypes.INTEGER(11),
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
    tableName: 'shop_cart'
  });

  Model.associate = function() {

  }

  return Model;
};
