/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('category', {
    cid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    seoUrl: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    templateId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isNav: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER(9),
      allowNull: true,
      defaultValue: '1'
    },
    ctTemplateId: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    pid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    type: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    outUrl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    keyWord: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ctHtml: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isSubmit: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    seoTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'category'
  });

  Model.associate = function() {

  }

  return Model;
};
