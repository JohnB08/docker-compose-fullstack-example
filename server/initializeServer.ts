import {pool as db} from "./db.js"

const initializeServer = async() =>{
    try{
        await db.query("CREATE TABLE users (userName VARCHAR(255), password VARCHAR(255), token VARCHAR(255), tokenKey VARCHAR(255), dateCreated VARCHAR(255), saltRounds INT)")
    } catch (error){
        console.log(error)
    }
}
await initializeServer()