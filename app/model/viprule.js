/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('viprule', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    vipGrade: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    vipIntegral: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'viprule'
  });

  Model.associate = function() {

  }

  return Model;
};
