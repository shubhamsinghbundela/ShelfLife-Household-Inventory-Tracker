import ApiResponse from "../../common/utils/api-response.js";
import * as householdService from './households.service.js'

const createHouseHold = (req, res, next) => {
    try {
        const data = householdService.createHouseHold(req.body);
        ApiResponse.ok(res, "Household Created Successfully", data);
    } catch (err) {
        next(err);
    }
}

export {
    createHouseHold
}