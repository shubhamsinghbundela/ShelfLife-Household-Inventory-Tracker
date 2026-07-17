import mongoose from "mongoose";

const itemsSchema = new mongoose.Schema(
  {
    householdId: {
      type: mongoose.Types.ObjectId,
      ref: "households",
    },
    addedBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["produce", "dairy", "meat", "pantry", "frozen"], //In Mongoose, enums are added as a validator within your schema definition for String and Number types. You provide an array of allowed values, and Mongoose will throw a validation error if any other value is saved.
    },
    quantity: Number,
    expiryDate: Date,
    status: {
      type: String,
      enum: ["fresh", "expiring-soon", "expired", "used", "wasted"],
    },
  },
  { timestamps: true },
);

const itemsModel = mongoose.model("items", itemsSchema);

export default itemsModel;
