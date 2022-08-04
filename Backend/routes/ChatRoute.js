import { isAuthenticated } from "../middleware/auth.js";
import express from "express";
import { accessChat, fetchChats } from "../controllers/ChatController.js";
const Router = express.Router();


Router.route('/').post(isAuthenticated,accessChat)
Router.route('/').get(isAuthenticated,fetchChats)


export default Router;