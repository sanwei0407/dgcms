/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('market', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    condition: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    region: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contacts: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pictureD: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tradeN: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    commodityD: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storeInformation: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isdelete: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'market'
  });

  Model.associate = function () {

  }

  return Model;
};