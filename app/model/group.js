/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('group', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    roles: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    tableName: 'group',
  });

  Model.associate = function() {

  };

  return Model;
};
