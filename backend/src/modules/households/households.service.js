import houseHoldModel from "./households.model.js"
import ApiError from "../../common/utils/api-error.js";

const createHouseHold = async (req) => {
    const name= req.body.name;
    const inviteCode = req.body.inviteCode;
    const createdBy = req.userId;
    const members = [req.userId];
    const newHouseHold = await houseHoldModel.create({
        name,
        inviteCode,
        createdBy
    })

    return {_id: newHouseHold._id, name: newHouseHold.name, inviteCode: newHouseHold.inviteCode}
}

const joinHouseHold = async (req) => {
    const inviteCode = req.body.inviteCode;

    const houseHoldExists = await houseHoldModel.findOne({
        inviteCode
    })

    if(!houseHoldExists){
        throw ApiError.badRequest("Invalid Invite Code");
    }

    const newMember = req.userId;

    const memberExists = houseHoldExists?.members?.includes(newMember);
    
    if (memberExists) {
        throw ApiError.badRequest("Member already exists in organisation");
    }

    houseHoldExists.members.push(newMember);

    await houseHoldExists.save();

    return {name: houseHoldExists.name, members: houseHoldExists.members}
}

export {
    createHouseHold,
    joinHouseHold
}