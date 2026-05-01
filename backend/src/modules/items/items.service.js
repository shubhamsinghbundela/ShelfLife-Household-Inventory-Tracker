const createItem = async (req) => {
    console.log('req.body', req.body);
    console.log('req.userId', req.userId);
    console.log('req.householdId', req.householdId);
}

export {
    createItem
}