    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"
    import { UserType } from "../Class/User.js"
    
    
    
    export const verifyPassword = async(user: UserType, password: string)=>{
        return await bcrypt.compare(password, user.password)
    }
    export const verifyToken = async(user: UserType, token: string)=>{
        return jwt.verify(token, user.tokenKey)
    }