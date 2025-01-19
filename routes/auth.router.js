import { Router } from "express";
import { LoginController, LogoutContoller, RegisterController } from "../controllers/auth.controller.js";
import { AuthSessionVerifyIn, AuthSessionVerifyOut } from "../middlewares/session.middleware.js";
import { LoginValidator, RegisterValidator } from "../middlewares/validator.middleware.js";

const AuthRouter = Router()

AuthRouter.post('/login', AuthSessionVerifyIn, LoginValidator, LoginController)
AuthRouter.post('/register', AuthSessionVerifyIn, RegisterValidator, RegisterController)
AuthRouter.post('/logout', AuthSessionVerifyOut, LogoutContoller)

export default AuthRouter
