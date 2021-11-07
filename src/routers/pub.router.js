import express from "express";
import userController from "../controllers/user/user.controller";
import { upload } from "../helpers/index"



export const pubRoute = express.Router();


pubRoute.post("/register", userController.register)
pubRoute.post("/login", userController.login)

pubRoute.post("/upload-file", upload.single("video") , userController.uploadFile)