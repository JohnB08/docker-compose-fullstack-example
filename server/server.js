import express from "express";
import { User } from "./Util/Class/User.js";
import cors from "cors";
import { verifyPassword } from "./Util/verifyFunctions/verifyFunctions.js";
import { fetchUser } from "./Util/postgresFunctions/fetchUser.js";
import { postNewUser } from "./Util/postgresFunctions/postUser.js";
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username) {
        return res.status(401).json({ message: "Missing Username" });
    }
    console.log(username, password);
    const fetchedUser = await fetchUser(username);
    if (!fetchedUser.success) {
        return res.status(500).json({ message: "Internal Database Error", error: fetchedUser.err });
    }
    if (fetchedUser.success && fetchedUser.data?.rowCount === 0) {
        return res.status(401).json({ message: "User does not exist" });
    }
    const user = fetchedUser.data?.rows[0];
    const validUserPassword = await verifyPassword(user, password);
    if (!validUserPassword) {
        return res.status(401).json({ message: "Invalid Login Info" });
    }
    const token = user.token;
    res.status(200).json({ message: "Authentication Successfull.", token: token });
});
app.post("/create", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username) {
        return res.status(401).json({ message: "Missing Username" });
    }
    const existingUsername = await fetchUser(username);
    console.log(existingUsername.data?.rowCount);
    if (!existingUsername.success) {
        return res.status(500).json({ message: "Internal Server Error", error: existingUsername.err });
    }
    if (existingUsername.success && existingUsername.data?.rowCount !== 0) {
        return res.status(401).json({ message: "User Allready Created" });
    }
    let newUser = await User.initUser(username, password);
    let tryPost = await postNewUser(newUser);
    console.log(tryPost);
    if (!tryPost.success) {
        return res.status(500).json({ message: "Internal Server Error, user not created.", error: tryPost.err });
    }
    return res.status(200).json({ message: "User Successfully Created", user: tryPost.data?.rows });
});
app.listen(port, () => {
    console.log(`Running on localhost:${port}`);
});
