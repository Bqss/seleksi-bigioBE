'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Stories', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      title: {
        type: Sequelize.STRING,
        allowNull:false
      },
      author: {
        type: Sequelize.STRING,
        allowNull:false
      },
      synopsis: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      category: {
        type: Sequelize.ENUM,
        values: ["financial","technology","health"],
        allowNull: false
      },
      cover: {
        type: Sequelize.STRING,
        allowNull:false
      },
      tags: {
        type: Sequelize.TEXT,
        allowNull:false
      },
      status: {
        type: Sequelize.ENUM,
        allowNull:false,
        values: ["draft","published"]
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Stories');
  }
};