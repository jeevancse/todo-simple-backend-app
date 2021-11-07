import express from "express";
import { taskRouter } from "../controllers/task/task.router";
import { userRouter } from "../controllers/user/user.router";

export const apiRoute = express.Router();

apiRoute.use("/task", taskRouter);
apiRoute.use("/user", userRouter);
