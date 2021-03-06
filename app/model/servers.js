/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('servers', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    serviceArea: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    contacts: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    businessA: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    serviceF: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    companyP: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    serviceContent: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    chargingS: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: ''
    },
    serviceComm: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isdelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'servers'
  });

  Model.associate = function() {

  }

  return Model;
};
