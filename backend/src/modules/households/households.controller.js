import ApiResponse from "../../common/utils/api-response.js";
import * as householdService from './households.service.js'

const createHouseHold = async (req, res, next) => {
    try {
        const data = await householdService.createHouseHold(req);
        ApiResponse.ok(res, "Household Created Successfully", data);
    } catch (err) {
        next(err);
    }
}

export {
    createHouseHold
}