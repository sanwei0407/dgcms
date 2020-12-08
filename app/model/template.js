/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('template', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    path: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'template'
  });

  Model.associate = function() {

  }

  return Model;
};
