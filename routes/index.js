const Router = require( "express");
const storyRouter = require("./story");


const StoryChapterController = require("../controllers/StoryChapterController");
const router = Router();


router.get("/", (req, res) => {
    return res.send("Hello World");
});
router.use("/", storyRouter);

router.get("/story/:storyId/chapter",StoryChapterController.getByStoryId);
router.post("/story/:storyId/chapter",StoryChapterController.store);
router.put("/story/chapter/:id",StoryChapterController.update);
router.delete("/story/chapter/:id",StoryChapterController.delete);




module.exports = router;