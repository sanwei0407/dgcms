/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('votelog', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    uid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    vitemId: {
      type: DataTypes.INTEGER(11),
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
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'votelog'
  });

  Model.associate = function() {

  }

  return Model;
};
