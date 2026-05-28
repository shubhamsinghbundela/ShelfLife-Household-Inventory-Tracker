import ApiResponse from "../../common/utils/api-response.js";
import * as itemService from "./items.service.js";

const createItem = async (req, res, next) => {
  try {
    const data = await itemService.createItem(req);
    ApiResponse.ok(res, "Item Created Successfully", data);
  } catch (err) {
    next(err);
  }
};

const getItems = async (req, res, next) => {
  try {
    const data = await itemService.getItems(req);
    ApiResponse.ok(res, "Items Fetched Successfully", data);
  } catch (err) {
    next(err);
  }
};

const updateItem = async (req, res, next) => {
  try {
    const data = await itemService.updateItem(req);

    ApiResponse.ok(res, "Item Updated Successfully", data);
  } catch (err) {
    next(err);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const data = await itemService.deleteItem(req);

    ApiResponse.ok(res, "Item Deleted Successfully", data);
  } catch (err) {
    next(err);
  }
};

export { createItem, getItems, updateItem, deleteItem };
