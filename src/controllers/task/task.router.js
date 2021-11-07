import express from "express";
import taskController from "./task.controller";

export const taskRouter = express.Router();

taskRouter.post("/create-task", taskController.addTask);
taskRouter.get("/get-task/:taskId", taskController.getTaskById);
taskRouter.get("/get-all-task", taskController.getAllTask);
taskRouter.put("/update-task", taskController.updateTask);
taskRouter.delete("/delete-task/:taskId", taskController.deleteTask);
