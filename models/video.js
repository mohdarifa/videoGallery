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
      mimetype: {
        allowNull: false,
        type: DataTypes.STRING(50)
      },
      size: {
        allowNull: false,
        type: DataTypes.BIGINT
      },
      poster: {
        allowNull: false,
        type: DataTypes.STRING
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