import ApiError from "../../common/utils/api-error.js";
import itemsModel from "./items.model.js";

const createItem = async (req) => {
  const { name, category, quantity, expiryDate } = req.body;
  const userId = req.userId;
  const householdId = req.householdId;

  if (!name || !category || !quantity || !expiryDate) {
    throw ApiError.badRequest("All fields are required");
  }

  const today = new Date();
  const expiry = new Date(expiryDate);

  // Normalize time (important for correct comparison)
  //Removes time part → avoids wrong comparisons
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);

  const diffTime = expiry - today;
  // 1000 → milliseconds in 1 second
  // 60 → seconds in 1 minute
  // 60 → minutes in 1 hour
  // 24 → hours in 1 day
  //1 day = 86,400,000 milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let status = "fresh";

  if (diffDays < 0) {
    status = "expired";
  } else if (diffDays <= 3) {
    status = "expiring-soon";
  }

  const newItem = await itemsModel.create({
    householdId,
    addedBy: userId,
    name,
    category,
    quantity,
    expiryDate,
    status,
  });

  return {
    _id: newItem._id,
    name: newItem.name,
    status: newItem.status,
  };
};

const updateItemStatuses = async () => {
  try {
    const items = await itemsModel.find({});

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bulkOperations = [];
    const expiringItems = [];

    for (const item of items) {
      const expiry = new Date(item.expiryDate);
      expiry.setHours(0, 0, 0, 0);

      const diffTime = expiry - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStatus = "fresh";

      if (diffDays < 0) {
        newStatus = "expired";
      } else if (diffDays <= 3) {
        newStatus = "expiring-soon";
        expiringItems.push(item);
      }

      // Only update if status changed (VERY IMPORTANT OPTIMIZATION)
      if (item.status !== newStatus) {
        bulkOperations.push({
          updateOne: {
            filter: { _id: item._id },
            update: { $set: { status: newStatus } },
          },
        });
      }
    }

    if (bulkOperations.length > 0) {
      await itemsModel.bulkWrite(bulkOperations);
      console.log(`Updated ${bulkOperations.length} items`);
    }

    return expiringItems;
  } catch (error) {
    console.error("Cron job failed:", error);
  }
};

export { createItem, updateItemStatuses };
