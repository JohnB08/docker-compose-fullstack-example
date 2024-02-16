import express from "express"
import { User, UserType } from "./Util/Class/User.js"
import cors from "cors"
import { verifyPassword, verifyToken } from "./Util/verifyFunctions/verifyFunctions.js"
import { fetchUser } from "./Util/postgresFunctions/fetchUser.js"
import { postNewUser } from "./Util/postgresFunctions/postUser.js"
import { validateAsToken, validateAsUserBody } from "./Util/verifyFunctions/validateBody.js"
import { fetchUserWithToken } from "./Util/postgresFunctions/fetchUserWithToken.js"

/* Globale variabler */
const port = 3000
const app = express();

/* Middleware */
app.use(cors()) //Cors endabler
app.use(express.json()) //JSON URL bodyparser.


/* Log in endpoint */
app.post("/login", async (req, res)=>{
  const body = req.body
  console.log(body)

  /* Prøver å validere loginrequest med brukernavn/passord. */
  if (validateAsUserBody(body)){
    const {username, password} = body; 

    /* Hvis brukernavnet ikke finnes, returner status 401. */
    if (!username){
      return res.status(401).json({message: "Missing Username"})
    }

    /* Hvis passordet mangler, returner status 401. */
    if (!password){
      return res.status(401).json({message: "Missing Password"})
    }
    console.log(username, password)

    /* Prøv å finn en bruker som matcher passordet. */
    const fetchedUser = await fetchUser(username)

    /* Hvis server fetch failer, returner status 500. */
    if (!fetchedUser.success){
      return res.status(500).json({message:"Internal Database Error", error: fetchedUser.err})
    }

    /* Hvis brukeren ikke eksisterer, returner status 404. */
    if (fetchedUser.success && fetchedUser.data?.rowCount === 0){
     return res.status(404).json({message: "User does not exist"})
    }

    /* prøv å valider passordet til bruker. */
    const user: UserType = fetchedUser.data?.rows[0]
    const validUserPassword = await verifyPassword(user, password)

    /* Hvis passordet ikke kan valideres, returner status 401. */
    if (!validUserPassword){
      return res.status(401).json({message: "Invalid Login Info"})
    }

    /* Hvis passordet er valid returner status 200, og user token. */
    const token = user.token
    return res.status(200).json({message: "Authentication Successfull.", token: token})
  }

  /* Prøv å valider body som en token login request. */
  if (validateAsToken(body)){
      const {token} = body

      /* Hvis token mangler fra body, returner status 401. */
      if (!token){
        return res.status(401).json({message: "Missing token."})
      }

      /* Prøv å finne en bruker med gyldig token.  */
      const compareToken = await fetchUserWithToken(token)
      console.log(compareToken)

      /* Hvis serverfetch failer, returner status 500. */
      if (!compareToken.success){
        return res.status(500).json({message: "Internal Database Error"})
      }

      /* Hvis den ikke finner en token i databasen, return status 404. */
      if (compareToken.success && compareToken.data?.rowCount === 0){
        return res.status(404).json({message: "User not found."})
      }

      /* Prøver å verifie token. !!!DENNE ER IKKE FERDIG.!!! */
      const user: UserType = compareToken.data?.rows[0]
      console.log(user)
      const isTokenVerified = await verifyToken(user, token)
      console.log(isTokenVerified)
      return res.status(200).json({message: "token", token: isTokenVerified})

      /* Hvis den ikke klarer å verifie hva type login request det er, returner status 400. */
  } else return res.status(400).json({message: "bad request", body: body})
})


/* Create User Endpoint. */
app.post("/create", async (req, res)=>{
  const {username, password} = req.body
  console.log(username, password)

  /* Hvis brukernavnet ikke er med, returner status 401. */
  if (!username){
    return res.status(401).json({message: "Missing Username"})

    /* Hvis passordet mangler, returner status 401. */
  } else if (!password){
    return res.status(401).json({message: "Missing Password"})
  }

  /* Skjekker om brukernavn allerede eksisterer.  */
  const existingUsername = await fetchUser(username)
  console.log(existingUsername.data?.rowCount)

  /* Hvis server fetch failer, returner status 500. */
  if (!existingUsername.success){
    return res.status(500).json({message: "Internal Server Error", error: existingUsername.err})
  }

  /* hvis brukeren allerede eksisterer, returner status 400. */
  if(existingUsername.success && existingUsername.data?.rowCount !== 0){
    return res.status(400).json({message: "User Allready Created"})
  }

  /* Lag en ny bruker. */
    let newUser = await User.initUser(username, password)
    console.log(newUser)

    /* Prøver å poste ny bruker til postgreSQL */
    let tryPost = await postNewUser(newUser)
    console.log(tryPost)
    /* Hvis server fetch failer, returner status 500. */
    if (!tryPost.success){
      return res.status(500).json({message: "Internal Server Error, user not created.", error: tryPost.err})
    }
    /* Returner status 200, og brukertoken til client.  */
    const token  = tryPost.data?.rows[0].token
    return res.status(200).json({message: "User Successfully Created", userToken: token })
  
})

/* Server lytter til localhost:3000 */
app.listen(port, ()=>{
  console.log(`Running on localhost:${port}`)
})


