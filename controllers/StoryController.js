const { Story, StoryChapter, sequelize } = require("../models");
const { ValidationError, Op } = require("sequelize");
const { parseError, convertpath } = require("../utils");

class StoryController {
    static async getAll(req, res) {
        const { search, ...queries } = req.query;
        const whereClause = { ...queries };

        if (search) {
            whereClause.title = {
                [Op.like]: `%${search}%`
            }
            whereClause.author = {
                [Op.like]: `%${search}%`
            }
        }

        try {

            const stories = await Story.findAll({
                include: StoryChapter,
                order: [
                    ['createdAt', 'DESC']
                ],
                where: whereClause
            });
            return res.status(200).json({
                status: "ok",
                data: stories
            });

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    }
    s
    static async store(req, res) {
        
        const t = await sequelize.transaction();
        try {
            if (!req.file) {
                return res.status(400).json({
                    status: "error",
                    errors: {
                        cover: "cover is required"
                    }
                });
            }
    
            if (!req.file.mimetype.startsWith("image")) {
                return res.status(400).json({
                    status: "error",
                    errors: {
                        cover: "cover must be an image"
                    }
                });
            }
            const { chapters, ...rest } = req.body;
            const story = await Story.create({
                ...rest,
                cover: convertpath(req.file.path)
            });

            if (chapters && chapters.length > 0) {
                await StoryChapter.bulkCreate(chapters.map(chapter => ({
                    ...chapter,
                    cover: convertpath(req.file.path),
                    story_id: story.id
                })));
            }
            t.commit();

            return res.status(201).json({
                status: "ok",
                message: "Story created successfully",
            });

        } catch (error) {
            t.rollback();
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    status: "error",
                    errors: parseError(error),
                    payloads: req.body
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: error.message
                });
            }
        }

    }

    static async update(req, res) {
        const { chapters, ...rest } = req.body;
        if (req.file && !req.file.mimetype.startsWith("image")) {
            return res.status(400).json({
                status: "error",
                errors: {
                    cover: "cover must be an image"
                }
            });
        }

        console.log(chapters)
        const t = await sequelize.transaction();
        try {
            await StoryChapter.destroy({
                where: {
                    story_id: req.params.id
                }
            });

            if(chapters.length > 0){
                await StoryChapter.bulkCreate(chapters.map(chapter => ({
                    ...chapter,
                    story_id: req.params.id
                })));
            }

            const story = await Story.findByPk(req.params.id);
            if (!story) {
                return res.status(404).json({
                    status: "error",
                    message: "Story not found"
                });
            }
            story.set({
                "id": req.params.id,
                cover: req.file ? convertpath(req.file.path) : story.cover,
                ...req.body
            }, {
                reset: true
            });
            await story.validate();
            await story.save();

            return res.status(200).json({
                status: "ok",
                message: "Story updated",
            });
        } catch (error) {
            if (error instanceof ValidationError) {
                return res.status(400).json({
                    status: "error",
                    errors: parseError(error)
                });
            } else {
                return res.status(500).json({
                    status: "error",
                    message: error.message
                });
            }
        }
    }

    static async destroy(req, res) {
        try {
            const story = await Story.findByPk(req.params.id);
            if (!story) {
                return res.status(404).json({
                    status: "error",
                    message: "Story not found"
                });
            }
            await story.destroy();
            return res.status(200).json({
                status: "ok",
                message: "Story deleted"
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    }

    static async detail(req, res) {
        try {
            const story = await Story.findByPk(req.params.id, {
                include: StoryChapter
            });
            if (!story) {
                return res.status(404).json({
                    status: "error",
                    message: "Story not found"
                });
            }
            return res.status(200).json({
                status: "ok",
                data: story
            });
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    }


}

module.exports = StoryController;

