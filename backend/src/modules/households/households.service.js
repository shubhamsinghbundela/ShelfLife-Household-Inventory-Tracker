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

    return {householdId: newHouseHold._id, name: newHouseHold.name, inviteCode: newHouseHold.inviteCode}
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

    return {householdId: houseHoldExists._id, name: houseHoldExists.name, members: houseHoldExists.members}
}

const getAllMembers = async (req) => {
    const houseHoldId = req.params.id;

    const houseHoldExists = await houseHoldModel.findOne({
        _id: houseHoldId
    }).populate('members', 'name email');

    if(!houseHoldExists){
        throw ApiError.badRequest("HouseHold Not Exists");
    }

    return houseHoldExists.members;
}

const leaveHouseHold = async (req) => {
    const houseHoldId = req.params.id;
    const userId = req.userId;

    const houseHold = await houseHoldModel.findById(houseHoldId);

    if (!houseHold) {
        throw ApiError.notFound("Household not found");
    }

    const isMember = houseHold.members.some(
        (member) => member.toString() === userId
    );

    if (!isMember) {
        throw ApiError.badRequest("User is not a member of this household");
    }

    houseHold.members = houseHold.members.filter(
        (member) => member.toString() !== userId
    );

    //If creator/admin leaves
    if (houseHold.createdBy.toString() === userId) {
        if (houseHold.members.length === 0) {
            await houseHold.deleteOne();
            return { message: "Household deleted as no members left" };
        }else{
            houseHold.createdBy = houseHold.members[0];
        }
    }

    await houseHold.save();

    return {
        householdId: houseHold._id,
        members: houseHold.members
    };
}

export {
    createHouseHold,
    joinHouseHold,
    getAllMembers,
    leaveHouseHold
}