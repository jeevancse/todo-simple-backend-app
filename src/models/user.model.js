import mongoose from "mongoose";

const user = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  loginToken: { type: String, required: false },
});

export const Users = mongoose.model("Users", user);
