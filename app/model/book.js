/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('book', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    sTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    eTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    brief: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    author: {
      type: DataTypes.STRING(32),
      allowNull: true,
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    peopleLimit: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    isdelete: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    tableName: 'book',
  });

  Model.associate = function() {

  };

  return Model;
};
