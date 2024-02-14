import {pool as db} from "../../db.js"


export const fetchUser = async (userName: string)=>{
    try{
    const data = await db.query("SELECT * FROM users WHERE userName = $1", [userName])
    return {data, success: true }
    } catch(err){
        return {err, success: false}
    }
}