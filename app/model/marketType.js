module.exports = app => {
    const DataTypes = app.Sequelize;

    const Model = app.model.define('markettype', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        isDelete: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        tableName: 'markettype'
    });

    Model.associate = function () {

    }

    return Model;
};