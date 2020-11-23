/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('ad', {
    aid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adUrl: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    width: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    height: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    goto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0'
    },
  }, {
    tableName: 'ad',
  });

  Model.associate = function() {

  };

  return Model;
};
