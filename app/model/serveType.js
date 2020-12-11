/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('servetype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    serve: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Pserve: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'servetype'
  });

  Model.associate = function() {

  }

  return Model;
};
