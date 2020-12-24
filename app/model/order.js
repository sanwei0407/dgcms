/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    orderTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    beizhu: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'order'
  });

  Model.associate = function() {

  }

  return Model;
};
