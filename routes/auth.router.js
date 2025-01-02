import { Router } from "express";
import { LoginController, LogoutContoller, SignUpController } from "../controllers/auth.controller.js";

const AuthRouter = Router()

AuthRouter.post('/login', LoginController)
AuthRouter.post('/signup', SignUpController)
AuthRouter.post('/logout', LogoutContoller)

export default AuthRouter