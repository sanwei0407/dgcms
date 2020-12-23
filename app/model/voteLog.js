/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('votelog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vitemId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    perlimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'votelog'
  });

  Model.associate = function() {

  }

  return Model;
};
