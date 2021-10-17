import { responseObject, genratePassword } from "../../helpers";
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
  
};
