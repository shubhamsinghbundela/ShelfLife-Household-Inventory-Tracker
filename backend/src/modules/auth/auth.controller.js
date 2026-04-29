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
    const data = await authService.login(req.body);
    ApiResponse.ok(res, "Login Successful", data)
    
  } catch(error) {
    next(error);
  }
}

export { register, login };
