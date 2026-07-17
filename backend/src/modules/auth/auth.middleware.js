import userModel from "../auth/auth.model.js";
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

const authMiddleware = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw ApiError.unauthorized("Not Autheticated");

    const decode = verifyAccessToken(token);

    const userExists = await userModel.findOne({
      _id: decode.userId,
    });

    if (!userExists) {
      throw ApiError.notFound("User Not found");
    }

    req.userId = decode.userId;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
