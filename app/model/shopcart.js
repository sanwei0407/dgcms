/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_cart', {
    carid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true

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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    checked: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'shop_cart'
  });

  Model.associate = function() {

  }

  return Model;
};
