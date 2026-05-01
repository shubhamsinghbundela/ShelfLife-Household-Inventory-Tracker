import mongoose from "mongoose";

const houseHoldSchema = new mongoose.Schema({
    name: String,
    inviteCode: String,
    members: [{
        type: mongoose.Types.ObjectId,
        ref: "users"
    }],
    createdBy: mongoose.Types.ObjectId
}, { timestamps: true })

const houseHoldModel = mongoose.model("households", houseHoldSchema)

export default houseHoldModel;