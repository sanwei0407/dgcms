/* indent size: 2 */

module.exports = app => {
  const DataTypes = app.Sequelize;

  const Model = app.model.define('shop_classify', {
    cateid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    parentid: {
      type: DataTypes.STRING(64),
      allowNull: true,
    },
    classname: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sortorder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isDelete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: '0',
    },
  }, {
    tableName: 'shop_classify',
  });

  Model.associate = function() {

  };

  return Model;
};
