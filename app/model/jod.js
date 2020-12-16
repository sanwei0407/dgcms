/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jod', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Salary: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    post: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workA: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workAGPS: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    jodC: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    jobR: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workingH: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    welfare: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    workingYears:{
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    educationRequirements:{
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    isdelete: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '0',
    },
  }, {
    tableName: 'jod',
  });

  Model.associate = function() {

  };

  return Model;
};
