import authController from "../controller/authController.js";
import express from "express";
import verify from "../middleware/auth.js"

const userRouter = express.Router();

userRouter.post("/register",authController.register);
userRouter.post("/login",authController.login);
userRouter.get("/allUsers",verify,authController.allUsers);

export default  userRouter ;