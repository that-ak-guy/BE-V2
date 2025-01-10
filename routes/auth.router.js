import { Router } from "express";
import { LoginController, LogoutContoller, SignUpController } from "../controllers/auth.controller.js";
import { AuthSessionVerifyIn, AuthSessionVerifyOut } from "../middlewares/session.middleware.js";
import { RegisterValidator } from "../middlewares/validator.middleware.js";

const AuthRouter = Router()

AuthRouter.post('/login', AuthSessionVerifyIn, LoginController)
AuthRouter.post('/signup', AuthSessionVerifyIn, RegisterValidator, SignUpController)
AuthRouter.post('/logout', AuthSessionVerifyOut, LogoutContoller)

export default AuthRouter
