import houseHoldModel from "./households.model.js"

const createHouseHold = async (req) => {
    const name= req.body.name;
    const inviteCode = req.body.inviteCode;
    const createdBy = req.userId;
    const newHouseHold = await houseHoldModel.create({
        name,
        inviteCode,
        createdBy
    })

    return {_id: newHouseHold._id, name: newHouseHold.name, inviteCode: newHouseHold.inviteCode}
}

export {
    createHouseHold
}