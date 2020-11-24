/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('voteitem', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
autoIncrement:true
    },
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    berif: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    cover: {
      type: DataTypes.STRING(150),
      allowNull: true
    },
    ticketCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    state: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    vid:{
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'voteitem'
  });

  Model.associate = function() {

  }

  return Model;
};
