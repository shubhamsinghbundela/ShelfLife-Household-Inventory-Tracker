import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userModel from "./auth.model.js";
import ApiError from "../../common/utils/api-error.js";

const register = async ({ name, password, email }) => {
    const userExist = await userModel.findOne({
        email: email
    })

    if(userExist){
        throw ApiError.forbidden("User Already Exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
        name,
        password: hashedPassword, 
        email
    })

    return newUser._id;
};

const login = async ({email, password}) => {
    const userExist = await userModel.findOne({
        email: email
    })

    console.log("userExist", userExist);

    if(!userExist){
        throw ApiError.forbidden("User Not Found");
    }

    const correctPassword = await bcrypt.compare(
        password,
        userExist.password
    )

    // console.log('correctPassword', correctPassword);

    if(correctPassword){
        const token = jwt.sign({email, password}, process.env.JWT_SECRET)
        return token;
    }else{
        throw ApiError.forbidden("Password is invalid");
    }
}

export {
    register, 
    login
};
