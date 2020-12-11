/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_product', {
    proid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cateid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    proname: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    subtitle: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    mainimage: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createtime: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'shop_product',
  });

  Model.associate = function() {

  };

  return Model;
};
