import bcrypt from "bcrypt";
import multer from "multer";
var jwt = require("jsonwebtoken");

export const responseObject = (
  req,
  res,
  data,
  responseCode,
  success,
  message
) => {
  return res.send({
    code: responseCode,
    success: success,
    message: message,
    data: data,
  });
};

export const genratePassword = async (password) => {
  const salt = await bcrypt.genSalt();
  const pass = await bcrypt.hash(password, salt);
  return pass;
};

export const comparePassword = async (enterPassword, oldPassword) => {
  const check = await bcrypt.compare(enterPassword, oldPassword);
  return check;
};

export const generateJwtToken = async (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" });
  return token;
};

export const extractToken =  (token) => {
  const verify =  jwt.verify(token, process.env.JWT_SECRET);
  if (verify) {
    return verify;
  } else {
    return "";
  }
};

const uploadVideoFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: uploadVideoFile });
