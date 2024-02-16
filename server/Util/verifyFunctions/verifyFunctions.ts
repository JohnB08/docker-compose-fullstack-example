    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"
    import { UserType } from "../Class/User.js"
    
    
    
    export const verifyPassword = async(user: UserType, password: string)=>{
        return await bcrypt.compare(password, user.password)
    }
    export const verifyToken = async(user:UserType, token: string)=>{
        try {
           const verifiedToken =  jwt.verify(token, user.tokenkey)
           return verifiedToken
        } catch (error){
            return error
        }
    }