/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('booking', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    peoples: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    zone: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    tags: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    size: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    paiban: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '[]'
    },
    gps: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    lng: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    lat: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'booking'
  });

  Model.associate = function() {

  }

  return Model;
};
