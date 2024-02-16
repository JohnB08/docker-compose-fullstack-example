import {pool as db} from "../../db.js"
import { UserType } from "../Class/User.js"


export const postNewUser = async (user: UserType)=>{
    const {username, password, token, tokenkey, dateCreated, saltRounds} = user
    try {
        let data =  await db.query("INSERT INTO users (userName, password, token, tokenKey, dateCreated, saltRounds) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [username, password, token, tokenkey, dateCreated, saltRounds])
        return {data, success: true}
    } catch (err){
        return {err, success:false}
    }
}