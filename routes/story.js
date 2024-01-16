const Router = require( "express");
const StoryController = require("../controllers/StoryController");


router.get("/story",StoryController.getAll);
router.get("/story/:id",StoryController.detail);
router.post("/story",uploader.single("cover"),StoryController.store);
router.put("/story/:id",uploader.single("cover"),StoryController.update);
router.delete("/story/:id",StoryController.destroy);

const router = Router();


export default router;