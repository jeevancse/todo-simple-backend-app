import express from "express";
import { taskRouter } from "../controllers/task/task.router";

export const apiRoute = express.Router();

apiRoute.use("/task", taskRouter);
