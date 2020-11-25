/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('pm', {
    pmID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    fromID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    toID: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    canRead: {
      type: DataTypes.INTEGER,
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
