'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StoryChapter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StoryChapter.belongsTo(models.Story, {
        foreignKey : "story_id",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  StoryChapter.init({
    id:{
        type: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    story_id: {
        type: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true,
            isUUID: 4,
        }
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 255]
        }
    },
    story: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
  }, {
    sequelize,
    modelName: 'StoryChapter',
  });
  return StoryChapter;
};