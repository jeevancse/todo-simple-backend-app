import { extractToken, responseObject } from "../helpers";

import { Users } from "../models/user.model";

const apiRouteMiddleware = async (req, res, next) => {
  try {
    const token = req.headers["token"];
    if (!token) {
      return responseObject(req, res, {}, 400, false, "Token is not provided");
    }
    const verify = extractToken(token);
    if (verify) {
      const getUser = await Users.findOne({ id: verify.userId });
      if (getUser) {
        req.user = getUser;
        return next();
      } else {
        return responseObject(
          req,
          res,
          {},
          401,
          false,
          "You are authrized to this route"
        );
      }
    } else {
      return responseObject(
        req,
        res,
        {},
        401,
        false,
        "You are authrized to this route"
      );
    }
  } catch (err) {
    return responseObject(req, res, {}, 500, false, "Something went wrong");
  }
};

export default apiRouteMiddleware;
// module.exports = apiRouteMiddleware
