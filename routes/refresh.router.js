import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller.js";

const RefreshRouter = Router()

RefreshRouter.post('/', RefreshController)


export default RefreshRouter