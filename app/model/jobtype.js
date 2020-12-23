/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jobtype', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Ptype: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'jobtype'
  });

  Model.associate = function() {

  }

  return Model;
};
