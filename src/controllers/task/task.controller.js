import { Task } from "../../models/task.model";
import { responseObject } from "../../helpers";

export default {
  async addTask(req, res) {

    req.body.userId = req.user?._id;
    try {
      const addTsk = await Task.create(req.body);
      if (addTsk) {
        return responseObject(
          req,
          res,
          addTsk,
          201,
          true,
          "Add task successfully."
        );
      } else {
        return responseObject(req, res, {}, 500, false, "Something went wrong");
      }
    } catch (err) {
      return responseObject(req, res, {}, 500, false, "Something went wrong");
    }
  },

  async getTaskById(req, res) {
    try {
      const fndTask = await Task.findOne({ _id: req.params.taskId });
      if (fndTask) {
        return responseObject(
          req,
          res,
          fndTask,
          200,
          true,
          "Get task successfully."
        );
      } else {
        return responseObject(req, res, {}, 200, true, "Task not found.");
      }
    } catch (err) {
      return responseObject(req, res, {}, 500, false, "Something went wrong");
    }
  },

  async getAllTask(req, res) {
    try {
      const fndTask = await Task.find({ userId: req.user._id });
      if (fndTask.length > 0) {
        return responseObject(
          req,
          res,
          fndTask,
          200,
          true,
          "Get task successfully."
        );
      } else {
        return responseObject(req, res, {}, 200, true, "Task not found.");
      }
    } catch (err) {
      return responseObject(req, res, {}, 500, false, "Something went wrong");
    }
  },

  async updateTask(req, res) {
    try {
      const updtTsk = await Task.findOneAndUpdate(
        { _id: req.body.taskId },
        req.body
      );
      if (updtTsk) {
        return responseObject(
          req,
          res,
          {},
          200,
          true,
          "Task updated successfully."
        );
      } else {
        return responseObject(req, res, {}, 500, false, "Something went wrong");
      }
    } catch (err) {
      return responseObject(req, res, {}, 500, false, "Something went wrong");
    }
  },

  async deleteTask(req, res) {
    try {
      const deleteTask = await Task.findOneAndDelete({
        _id: req.params.taskId,
      });
      if (deleteTask) {
        return responseObject(
          req,
          res,
          {},
          200,
          true,
          "Task deleted successfully."
        );
      } else {
        return responseObject(req, res, {}, 500, false, "Something went wrong");
      }
    } catch (err) {
      return responseObject(req, res, {}, 500, false, "Something went wrong");
    }
  },
};
