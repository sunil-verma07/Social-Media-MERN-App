import express from "express";

import { createPost, deletePost, LikeAndUnlikePost,getPostOfFollowing,updateCaption,commentOnPost,deleteComment} from "../controllers/PostController.js";
import { isAuthenticated } from "../middleware/auth.js";

const Router = express.Router();

Router.route("/upload").post(isAuthenticated,createPost);

Router.route("/allposts").get(isAuthenticated,getPostOfFollowing);


Router.route("/:id").get(isAuthenticated,LikeAndUnlikePost);

Router.route("/remove/:id").delete(isAuthenticated,deletePost);


Router.route("/update/:id").put(isAuthenticated,updateCaption)

Router.route("/comment/:id").put(isAuthenticated,commentOnPost)

Router.route("/comment/delete/:id").delete(isAuthenticated,deleteComment)

export default Router;