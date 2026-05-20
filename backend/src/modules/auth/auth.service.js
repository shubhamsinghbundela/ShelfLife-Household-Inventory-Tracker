import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../common/utils/jwt.utils.js";

const register = async ({ name, password, email }) => {
  const userExist = await userModel.findOne({
    email: email,
  });

  if (userExist) {
    throw ApiError.forbidden("User Already Exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userModel.create({
    name,
    password: hashedPassword,
    email,
  });

  return { userId: newUser._id, name: newUser.name, email: newUser.email };
};

const login = async ({ email, password }) => {
  const userExist = await userModel.findOne({
    email: email,
  });

  if (!userExist) {
    throw ApiError.forbidden("User Not Found");
  }

  const correctPassword = await bcrypt.compare(password, userExist.password);

  if (correctPassword) {
    const accessToken = generateAccessToken({ userId: userExist._id, email });
    const refreshToken = generateRefreshToken({ userId: userExist._id });
    return { accessToken, refreshToken };
  } else {
    throw ApiError.forbidden("Password is invalid");
  }
};

export { register, login };
