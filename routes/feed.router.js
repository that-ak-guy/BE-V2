import { Router } from "express";
import { FeedController } from "../controllers/feed.controller.js";

const FeedRouter = Router()

FeedRouter.post('/content', FeedController)
FeedRouter.post('/suggest')

export default FeedRouter