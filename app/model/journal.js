/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('journal', {
    bid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    beforfee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    changefee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    afterfee: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    addTime: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'journal'
  });

  Model.associate = function() {

  }

  return Model;
};
