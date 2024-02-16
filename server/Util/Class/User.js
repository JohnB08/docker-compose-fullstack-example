import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const generateSalt = () => {
    return Math.ceil(Math.random() * 10);
};
const generateTokenKey = () => {
    return Math.ceil(Math.random() * 1000).toString(32).slice(0, 4);
};
export class User {
    username;
    password;
    token;
    dateCreated;
    tokenkey;
    saltRounds;
    constructor(username, password, saltRounds, token, tokenkey) {
        this.username = username;
        this.saltRounds = saltRounds;
        this.tokenkey = tokenkey;
        this.password = password;
        this.dateCreated = new Date().toLocaleDateString();
        this.token = token;
    }
    static async initUser(username, password) {
        const salt = generateSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const tokenkey = generateTokenKey();
        const token = jwt.sign({ userId: username }, tokenkey, { expiresIn: "1h" });
        return new User(username, hashedPassword, salt, token, tokenkey);
    }
}
