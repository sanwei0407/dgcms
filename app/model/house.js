/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('house', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    pictureDi: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    leasingM: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    houseT: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    floor: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    detailedA: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    indoorF: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    communalF: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    houseH: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    housingD: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    architecturalA: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    buildingT: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    propertyC: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    propertyCosts: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    businessD: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isdelete: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'house'
  });

  Model.associate = function() {

  }

  return Model;
};
