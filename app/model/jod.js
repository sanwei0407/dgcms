/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('jod', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Salary: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    post: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workA: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jodC: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    jobR: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workingH: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isdelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    workAGPS: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    welfare: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    workingYears: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    educationRequirements: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'jod'
  });

  Model.associate = function() {

  }

  return Model;
};
