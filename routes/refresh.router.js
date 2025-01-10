import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller.js";
import { RefreshSessionVerify } from "../middlewares/session.middleware.js";

const RefreshRouter = Router()

RefreshRouter.post('/', RefreshSessionVerify, RefreshController)

export default RefreshRouter