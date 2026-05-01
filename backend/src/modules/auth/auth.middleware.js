import jwt from 'jsonwebtoken';
import userModel from '../auth/auth.model.js'
import ApiError from '../../common/utils/api-error.js';

const authMiddleware = async (req, res, next) => {
    try{
        const token = req.headers.token;

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const userExists = await userModel.findOne({
            _id: decode.userId
        })

        if(!userExists){
            throw ApiError.notFound("User Not found");
        }
    
        req.userId = decode.userId;
    
        next();
    } catch (error){
        next(error)
    }
};

export default authMiddleware;