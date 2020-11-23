/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('baseParameter', {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    key: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
  }, {
    tableName: 'baseParameter'
  });

  Model.associate = function() {

  }

  return Model;
};
