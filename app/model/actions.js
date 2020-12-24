/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('actions', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    updateTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    activityId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'actions'
  });

  Model.associate = function() {

  }

  return Model;
};
