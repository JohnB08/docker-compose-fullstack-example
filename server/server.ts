import express from "express"
import { User, UserType } from "./Util/Class/User.js"
import cors from "cors"
import { verifyPassword, verifyToken } from "./Util/verifyFunctions/verifyFunctions.js"
import { fetchUser } from "./Util/postgresFunctions/fetchUser.js"
import { postNewUser } from "./Util/postgresFunctions/postUser.js"
import { validateAsToken, validateAsUserBody } from "./Util/verifyFunctions/validateBody.js"
import { fetchUserWithToken } from "./Util/postgresFunctions/fetchUserWithToken.js"


const port = 3000
const app = express();


app.use(cors())
app.use(express.json())



app.post("/login", async (req, res)=>{
  const body = req.body
  console.log(body)
  if (validateAsUserBody(body)){
    const {username, password} = body; 
    if (!username){
      return res.status(401).json({message: "Missing Username"})
    }
    console.log(username, password)
    const fetchedUser = await fetchUser(username)
    if (!fetchedUser.success){
      return res.status(500).json({message:"Internal Database Error", error: fetchedUser.err})
    }
    if (fetchedUser.success && fetchedUser.data?.rowCount === 0){
     return res.status(404).json({message: "User does not exist"})
    }
    const user: UserType = fetchedUser.data?.rows[0]
    const validUserPassword = await verifyPassword(user, password)
    if (!validUserPassword){
      return res.status(401).json({message: "Invalid Login Info"})
    }
    const token = user.token
    return res.status(200).json({message: "Authentication Successfull.", token: token})
  }
  if (validateAsToken(body)){
      const {token} = body
      if (!token){
        return res.status(401).json({message: "Missing token."})
      }
      const compareToken = await fetchUserWithToken(token)
      console.log(compareToken)
      if (!compareToken.success){
        return res.status(500).json({message: "Internal Database Error"})
      }
      if (compareToken.success && compareToken.data?.rowCount === 0){
        return res.status(404).json({message: "User not found."})
      }
      const user: UserType = compareToken.data?.rows[0]
      console.log(user)
      const isTokenVerified = await verifyToken(user, token)
      console.log(isTokenVerified)
      return res.status(200).json({message: "token", token: isTokenVerified})
  } else return res.status(400).json({message: "bad request", body: body})
})

app.post("/create", async (req, res)=>{
  const {username, password} = req.body
  console.log(username, password)
  if (!username){
    return res.status(401).json({message: "Missing Username"})
  } else if (!password){
    return res.status(401).json({message: "Missing Password"})
  }
  const existingUsername = await fetchUser(username)
  console.log(existingUsername.data?.rowCount)
  if (!existingUsername.success){
    return res.status(500).json({message: "Internal Server Error", error: existingUsername.err})
  }
  if(existingUsername.success && existingUsername.data?.rowCount !== 0){
    return res.status(400).json({message: "User Allready Created"})
  }
    let newUser = await User.initUser(username, password)
    console.log(newUser)
    let tryPost = await postNewUser(newUser)
    console.log(tryPost)
    if (!tryPost.success){
      return res.status(500).json({message: "Internal Server Error, user not created.", error: tryPost.err})
    }
    const token  = tryPost.data?.rows[0].token
    return res.status(200).json({message: "User Successfully Created", userToken: token })
  
})


app.listen(port, ()=>{
  console.log(`Running on localhost:${port}`)
})


