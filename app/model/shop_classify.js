/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_classify', {
    cateid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    parentid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    classname: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sortorder: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    createtime: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDelete: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'shop_classify'
  });

  Model.associate = function() {

  }

  return Model;
};
