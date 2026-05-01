import ApiResponse from "../../common/utils/api-response.js";
import * as itemService from './items.service.js'

const createItem = async (req, res, next) => {
    try {
        const data = await itemService.createItem(req);
        ApiResponse.ok(res, "Item Created Successfully", data);
    } catch (err) {
        next(err);
    }
};

export {
    createItem
}