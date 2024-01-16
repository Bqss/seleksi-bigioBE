const Router = require( "express");
const StoryController = require("../controllers/StoryController");
const StoryChapterController = require("../controllers/StoryChapterController");
const router = Router();

const { uploader } = require("../utils");

router.get("/", (req, res) => {
    return res.send("Hello World");
});

router.get("/story",StoryController.getAll);
router.get("/story/:id",StoryController.detail);
router.post("/story",uploader.single("cover"),StoryController.store);
router.put("/story/:id",uploader.single("cover"),StoryController.update);
router.delete("/story/:id",StoryController.destroy);


router.get("/story/:storyId/chapter",StoryChapterController.getByStoryId);
router.post("/story/:storyId/chapter",StoryChapterController.store);
router.put("/story/chapter/:id",StoryChapterController.update);
router.delete("/story/chapter/:id",StoryChapterController.delete);




module.exports = router;