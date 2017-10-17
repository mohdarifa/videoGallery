'use strict';
module.exports = (sequelize, DataTypes) => {
  var Video = sequelize.define('Video', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      filename: {
        allowNull: false,
        type: DataTypes.STRING
      },
      extension: {
        allowNull: false,
        type: DataTypes.STRING(5)
      },
      size: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
    },
    {
      tableName: 'videos',
      classMethods: {
        associate: function(models) {
          // associations can be defined here
        }
      }
    }
  );
  return Video;
};