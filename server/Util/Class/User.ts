import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const generateSalt = () =>{
        return Math.ceil(Math.random()*50)
    }

const generateTokenKey = () =>{
    return Math.ceil(Math.random()*10000000000).toString(32).slice(0, 10)
}

export class User{
    username: string
    password: string
    token: string
    dateCreated: string
    tokenKey: string
    saltRounds: number
    private constructor(username: string, password: string, saltRounds: number, token: string, tokenKey: string){
        this.username = username
        this.saltRounds = saltRounds
        this.tokenKey = tokenKey
        this.password = password
        this.dateCreated = new Date().toLocaleDateString()
        this.token = token
    }  

    static async initUser(username: string, password: string){
        const salt = generateSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        const tokenKey = generateTokenKey()
        const token = jwt.sign({userId: username}, tokenKey, {expiresIn: "1h"})
        return new User(username, hashedPassword, salt, token, tokenKey)
    }
}

export type UserType  = User