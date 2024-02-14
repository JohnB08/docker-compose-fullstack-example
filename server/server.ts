import express from "express"
import { User, UserType } from "./Util/Class/User.js"
import bodyParser from "body-parser"
import cors from "cors"
import { verifyPassword, verifyToken } from "./Util/verifyFunctions/verifyFunctions.js"
import { fetchUser } from "./Util/postgresFunctions/fetchUser.js"
import { postNewUser } from "./Util/postgresFunctions/postUser.js"


const port = 3000
const app = express();


app.use(cors())
app.use(bodyParser.json())

const findUser = async(username: string, password: string)=>{
  const queryResult = await fetchUser(username)
  console.log(queryResult)
  if (!queryResult.success){
    console.log(queryResult.err)
    return null
  }
  const user = queryResult.data?.rows[0]
  console.log(user)
  if (!user) return null
  const passwordVerified = await verifyPassword(user, password)
  console.log(passwordVerified)
  if (!passwordVerified) return null
  return user
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
  const {username, password} = req.body
  console.log(username, password)
  if (!username){
    return res.status(401).json({message: "Missing Username"})
  }
  const existingUsername = await fetchUser(username)
  if(existingUsername){
    return res.status(401).json({message: "User Allready Created"})
  } else {
    let newUser = await User.initUser(username, password)
    let tryPost = await postNewUser(newUser)
    console.log(tryPost)
    if (!tryPost){
      return res.status(500).json({message: "Internal Server Error, user not created."})
    }
    return res.status(200).json({message: "User Successfully Created"})
  }
})


app.listen(port, ()=>{
  console.log(`Running on localhost:${port}`)
})


