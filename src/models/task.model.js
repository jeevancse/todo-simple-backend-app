import mongoose from "mongoose";

const task = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["todo", "inprogress", "completed"],
    required: true,
  },
});

export const Task = mongoose.model("Task", task);
