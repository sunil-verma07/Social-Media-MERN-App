import express from 'express';
import { getAllMessages, sendMessage } from '../controllers/MessageController.js';
import {isAuthenticated} from '../middleware/auth.js'
const Router = express.Router();

Router.route('/').post(isAuthenticated,sendMessage)
Router.route('/:chatId').get(isAuthenticated,getAllMessages)

export default Router