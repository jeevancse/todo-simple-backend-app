import express from "express";
import userController from "../controllers/user/user.controller";

export const pubRoute = express.Router();


pubRoute.post("/register", userController.register)
pubRoute.post("/login", userController.login)