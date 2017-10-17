'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('videos', {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER
            },
            filename: {
              allowNull: false,
              type: Sequelize.STRING
            },
            extension: {
              allowNull: false,
              type: Sequelize.STRING(5)
            },
            size: {
              allowNull: false,
              type: Sequelize.BIGINT
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE
            }
          });
        },
        down: (queryInterface, Sequelize) => {
          return queryInterface.dropTable('videos');
        }
    };