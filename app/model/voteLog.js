/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('voteLog', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true
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
      type: DataTypes.STRING,
      allowNull: true
    },
    perlimit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    tableName: 'voteLog'
  });

  Model.associate = function() {

  }

  return Model;
};
