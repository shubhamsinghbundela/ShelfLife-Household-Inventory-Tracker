import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    try{
        const token = req.headers.token;

        const decode = jwt.verify(token, process.env.JWT_SECRET);
    
        req.userId = decode.userId;
    
        next();
    } catch (error){
        next(error)
    }
};

export default authMiddleware;