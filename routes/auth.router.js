import { Router } from "express";
import { LoginController, LogoutContoller, RegisterController } from "../controllers/auth.controller.js";
import { AuthSessionVerifyIn, AuthSessionVerifyOut } from "../middlewares/session.middleware.js";
import { RegisterValidator } from "../middlewares/validator.middleware.js";

const AuthRouter = Router()

AuthRouter.post('/login', AuthSessionVerifyIn, LoginController)
AuthRouter.post('/register', AuthSessionVerifyIn, RegisterController)
AuthRouter.post('/logout', AuthSessionVerifyOut, LogoutContoller)

export default AuthRouter
