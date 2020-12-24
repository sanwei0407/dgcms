/* indent size: 2 */

module.exports = app => {
    const DataTypes = app.Sequelize;
  
    const Model = app.model.define('totaldata', {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      totalusers: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      totalarticles: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      totalactivities: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      lastweekusers: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      todayusers: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      yesterdayuser: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
    }, {
      tableName: 'totaldata'
    });
  
    Model.associate = function() {
  
    }
  
    return Model;
  };
  