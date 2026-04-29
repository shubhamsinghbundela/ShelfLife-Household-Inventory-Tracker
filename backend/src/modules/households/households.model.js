import mongoose from "mongoose";

const houseHoldSchema = new mongoose.Schema({
    name: String,
    inviteCode: String,
    members: [mongoose.Types.ObjectId]
}, { timestamps: true })

const houseHoldModel = mongoose.model("households", houseHoldSchema)

export default houseHoldModel;