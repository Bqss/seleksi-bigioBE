'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('StoryChapters', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID
            },
            story_id: {
                type: Sequelize.UUID,
                references: {
                    model: 'Stories',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
                allowNull: false
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            story: {
                type: Sequelize.TEXT,
                allowNull: false
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
        await queryInterface.dropTable('StoryChapters');
    }
};