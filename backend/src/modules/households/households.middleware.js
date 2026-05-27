import ApiError from "../../common/utils/api-error.js";
import houseHoldModel from "./households.model.js";

const housholdMiddleware = async (req, res, next) => {
  try {
    const userId = req.userId;

    const householdExists = await houseHoldModel.findOne({
      members: userId,
    });

    if (!householdExists) {
      throw ApiError.notFound("HouseHold Not found");
    }

    req.householdId = householdExists._id.toString();

    next();
  } catch (error) {
    next(error);
  }
};

export default housholdMiddleware;
