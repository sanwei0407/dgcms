/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('role', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    action: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    icon: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'role'
  });

  Model.associate = function() {

  }

  return Model;
};
