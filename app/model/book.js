/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('book', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    eTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    brief: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    author: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    addTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    peopleLimit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    isdelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    mianji: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'book'
  });

  Model.associate = function() {

  }

  return Model;
};
