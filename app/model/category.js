/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('category', {
    cid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    seoUrl: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    templateId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isNav: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: '1'
    },
    ctTemplateId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    pid: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    outUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    keyWord: {
      type: DataTypes.STRING,
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ctHtml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isSubmit: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
  }, {
    tableName: 'category'
  });

  Model.associate = function() {

  }

  return Model;
};
