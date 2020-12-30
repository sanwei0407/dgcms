/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('ad', {
    aid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    adUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    goto: {
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
    isDelete: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0',
    },
    isHot: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
    },
  }, {
    tableName: 'ad',
  });

  Model.associate = function() {

  };

  return Model;
};
