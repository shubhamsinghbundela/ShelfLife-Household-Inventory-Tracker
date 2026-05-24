import ApiResponse from "../../common/utils/api-response.js";
import * as authService from "./auth.service.js";

const register = async (req, res, next) => {
  try {
    const user = await authService.register(req.body);

    ApiResponse.ok(res, "User get Created", user);
  } catch (error) {
    next(error); // pass error to global error middleware
  }
};

const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken, user } = await authService.login(
      req.body,
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    ApiResponse.ok(res, "Login Successful", { accessToken, user });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { accessToken } = await authService.refresh(req.cookies.refreshToken);
    ApiResponse.ok(res, "Token refreshed successfully", { accessToken });
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log("userId", userId);
    const { user } = await authService.getMe(userId);
    ApiResponse.ok(res, "User get successfully", { user });
  } catch (error) {
    next(error);
  }
};

export { register, login, refresh, getMe };
