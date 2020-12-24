/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('artteam', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    zone: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    buildTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    endTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    nums: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    peoples: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'artteam'
  });

  Model.associate = function() {

  }

  return Model;
};
