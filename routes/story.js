const Router = require( "express");
const StoryController = require("../controllers/StoryController");
const storyRouter = Router();

const { uploader } = require("../utils");

storyRouter.get("/story",StoryController.getAll);
storyRouter.get("/story/:id",StoryController.detail);
storyRouter.post("/story",uploader.single("cover"),StoryController.store);
storyRouter.put("/story/:id",uploader.single("cover"),StoryController.update);
storyRouter.delete("/story/:id",StoryController.destroy);


module.exports = storyRouter;