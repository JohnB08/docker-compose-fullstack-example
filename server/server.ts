import express from "express"
import fs from "fs"
import { User, UserType } from "./Util/Class/User.js"
import bodyParser from "body-parser"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"
import { verifyPassword, verifyToken } from "./Util/verifyFunctions/verifyFunctions.js"

const port = 3000
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pathToUsers = path.join(__dirname, "Data", "Users.json")
const app = express();

app.use(cors())
app.use(bodyParser.json())

const findUser = async(username: string, password: string)=>{
  const users: UserType[] = JSON.parse(fs.readFileSync(pathToUsers, "utf8")) || []
  console.log(users)
  const foundUser = users.find((u)=>{
   return u.username === username
  })
  console.log(foundUser)
  if (!foundUser) return null
  const passwordVerified = await verifyPassword(foundUser, password)
  console.log(passwordVerified)
  if (!passwordVerified) return null
  return foundUser
}


app.post("/login", async (req, res)=>{
  const {username, password} = req.body;  
  console.log(username, password)
  const user = await findUser(username, password)
  if (!user){
    return res.status(401).json({message:"Could not find user."})
  }
  const token = user.token
  res.status(200).json({message: "Authentication Successfull.", token: token})
})

app.post("/create", async (req, res)=>{
  const userList = JSON.parse(fs.readFileSync(pathToUsers, "utf8")) || []
  const {username, password} = req.body
  console.log(username, password)
  if (!username){
    return res.status(401).json({message: "Missing Username"})
  }
  const existingUsername = userList.find((u:UserType)=>{
    return u.username === username
  })
  if(existingUsername){
    return res.status(401).json({message: "User Allready Created"})
  } else {
    let newUser = await User.initUser(username, password)
    userList.push(newUser)
    fs.writeFileSync(pathToUsers, JSON.stringify(userList))
    return res.status(200).json({message: "User Successfully Created"})
  }
})


app.listen(port, ()=>{
  console.log(`Running on localhost:${port}`)
})


