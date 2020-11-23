/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('viprule', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    vipGrade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vipIntegral: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    tableName: 'viprule',
  });

  Model.associate = function() {

  };

  return Model;
};
