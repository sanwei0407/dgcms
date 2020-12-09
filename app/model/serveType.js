/* indent size: 2 */

module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('serveType', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // 服务类型
        serve: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        // 所属服务类型
        Pserve: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isDelete: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'serveType'
    });

    Model.associate = function () {

    }

    return Model;
};