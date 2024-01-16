'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Story extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Story.hasMany(models.StoryChapter, {
                foreignKey: "story_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Story.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            },
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        synopsis: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        category: {
            type: DataTypes.ENUM,
            values: ["financial", "technology", "health"],
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [["financial", "technology", "health"]],
            }
        },
        cover: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        tags: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        status: {
            type: DataTypes.ENUM,
            values: ["draft", "published"],
            validate: {
                isIn: [["draft", "published"]],
            }
        }
    }, {
        sequelize,
        modelName: 'Story',
    });
    return Story;
};