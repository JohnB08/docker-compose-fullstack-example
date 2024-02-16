    import bcrypt from "bcrypt"
    import jwt from "jsonwebtoken"
    import { UserType } from "../Class/User.js"
    
    
    /**
     * boolean function som bruker bcrypt for å sammenligne lagret passord og clientpassord.
     * @param user 
     * @param password 
     * @returns 
     */
    export const verifyPassword = async(user: UserType, password: string)=>{
        return await bcrypt.compare(password, user.password)
    }

    /**
     * Prøver å validere en token basert på en bruker, og token.
     * @param user brukerobjekt fetcha fra server.
     * @param token string levert fra client.
     * @returns validert token, med token id eller error.
     */
    export const verifyToken = async(user:UserType, token: string)=>{
        try {
           const verifiedToken =  jwt.verify(token, user.tokenkey)
           return verifiedToken
        } catch (error){
            return error
        }
    }