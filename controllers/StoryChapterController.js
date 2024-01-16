const {
    StoryChapter,
    Story
} = require("../models");

const { parseError } = require("../utils");

const { ValidationError } = require("sequelize");

class StoryChapterController {
    static async getByStoryId(req, res) {
        try {

            const story = await Story.findByPk(req.params.storyId);
            if (!story) {
                return res.status(404).json({
                    status: "error",
                    message: "Story not found"
                });
            }
            const storyChapters = await StoryChapter.findAll({
                where: {
                    story_id: req.params.storyId
                }
            });
            return res.status(200).json({
                status: "ok",
                message: "success retrieve data",
                data: storyChapters
            });
        } catch (err) {
            return res.status(500).json({
                status: "error",
                message: err.message
            });
        }
    }


    static async store(req, res) {
        try {
            const storyChapters = await StoryChapter.create({
                story_id: req.params.storyId,
                ...req.body
            });
            return res.status(201).json({
                status: "ok",
                message: "success create data",
                data: storyChapters
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    status: "error",
                    errors: parseError(err),
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: err.message
                });
            }
        }
    }

    static async update(req, res) {
        try {
            const storychapter = await StoryChapter.findByPk(req.params.id);
            if (!storychapter) {
                return res.status(404).json({
                    status: "error",
                    message: "Story not found"
                });
            }
            storychapter.set({
                "id": req.params.id,
                "story_id": storychapter.story_id,
                ...req.body
            }, {
                reset: true
            });
            await storychapter.validate();
            await storychapter.save();

            return res.status(200).json({
                status: "ok",
                message: "Story chapter  updated",
            });
        } catch (err) {
            if (err instanceof ValidationError) {
                return res.status(400).json({
                    status: "error",
                    errors: parseError(err),
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: err.message
                });
            }
        }
    }

    static async delete(req, res) {
        try {
            const storychapter = await StoryChapter.findByPk(req.params.id);
            if (!storychapter) {
                return res.status(404).json({
                    status: "error",
                    message: "Story chapter not found"
                });
            }
            await storychapter.destroy();
            return res.status(200).json({
                status: "ok",
                message: "Story chapter deleted",
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    }
}

module.exports = StoryChapterController;