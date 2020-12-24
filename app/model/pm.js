/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('pm', {
    pmID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fromID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    toID: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    msg: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sentTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    readTime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    isread: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    canRead: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '1'
    },
    imgUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'pm'
  });

  Model.associate = function() {

  }

  return Model;
};
