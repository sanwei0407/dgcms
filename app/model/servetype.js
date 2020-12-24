/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('servetype', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'servetype'
  });

  Model.associate = function() {

  }

  return Model;
};
