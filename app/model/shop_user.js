/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_user', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    creatime: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    sex: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'shop_user'
  });

  Model.associate = function() {

  }

  return Model;
};
