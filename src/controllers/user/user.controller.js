import {
  responseObject,
  genratePassword,
  comparePassword,
  generateJwtToken,
} from "../../helpers";
import { Users } from "../../models/user.model";

export default {
  async register(req, res) {
    try {
      let { email, name, password } = req.body;
      email ? email.toLowerCase().trim() : "";
      password = await genratePassword(password);
      const fndUsr = await Users.findOne({ email: email });
      if (fndUsr) {
        return responseObject(
          req,
          res,
          {},
          401,
          false,
          "User already registed. Please login"
        );
      }
      const crtUsr = await Users.create({
        name: name,
        email: email,
        password: password,
      });
      if (crtUsr) {
        return responseObject(
          req,
          res,
          crtUsr,
          200,
          true,
          "User registered successfully."
        );
      } else {
        return responseObject(
          req,
          res,
          {},
          500,
          false,
          "Something went wrong, Please try again"
        );
      }
    } catch (err) {
      console.log(err);
      return responseObject(
        req,
        res,
        {},
        500,
        false,
        "Something went wrong. Please try again"
      );
    }
  },
  async login(req, res) {
    try {
      let { email, password } = req.body;

      email ? email.toLowerCase().trim() : "";
      const fndUsr = await Users.findOne({ email: email });
      if (!fndUsr) {
        return responseObject(
          req,
          res,
          {},
          401,
          false,
          "Please Enter a valid email."
        );
      }
      const checkPassword = await comparePassword(password, fndUsr.password);
      if (!checkPassword) {
        return responseObject(
          req,
          res,
          {},
          401,
          false,
          "Please Enter a valid password"
        );
      }
      if (fndUsr) {
        const payload = { userId: fndUsr._id, email: fndUsr.email };
        const token = await generateJwtToken(payload);
        await Users.updateOne(
          { _id: fndUsr._id },
          { $set: { loginToken: token } }
        );

        return responseObject(
          req,
          res,
          { user: fndUsr, loginToken: token },
          200,
          true,
          "User login successfully."
        );
      } else {
        return responseObject(
          req,
          res,
          {},
          500,
          false,
          "Something went wrong, Please try again"
        );
      }
    } catch (err) {
      console.log(err);
      return responseObject(
        req,
        res,
        {},
        500,
        false,
        "Something went wrong. Please try again"
      );
    }
  },

  async getProfile(req, res) {
    try {
      const fndUser = await Users.findOne({ _id: req?.user?._id });
      if (fndUser) {
        return responseObject(
          req,
          res,
          fndUser,
          200,
          true,
          "Get profile successfully."
        );
      } else {
        return responseObject(req, res, {}, 401, false, "Data not found");
      }
    } catch (err) {
      return responseObject(
        req,
        res,
        {},
        500,
        false,
        "Something went wrong. Please try again"
      );
    }
  },

  async uploadFile(req, res) {
    try {
      console.log("=====filenaem", req.file);
      const uploadedFile = req.file;

      if (uploadedFile) {
        return res.json({
          message: "image upload successfully",
          filename: req.file,
        });
      } else {
        return res.json({ message: "something went wrong" });
      }
    } catch (err) {
      return res.json({ message: "something went wrong" });
    }
  },
};
