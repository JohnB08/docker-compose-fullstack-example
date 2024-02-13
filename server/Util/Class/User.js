import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const generateSalt = () => {
    return Math.ceil(Math.random() * 50);
};
const generateTokenKey = () => {
    return Math.ceil(Math.random() * 10000000000).toString(32).slice(0, 10);
};
export class User {
    username;
    password;
    token;
    dateCreated;
    tokenKey;
    saltRounds;
    constructor(username, password, saltRounds, token, tokenKey) {
        this.username = username;
        this.saltRounds = saltRounds;
        this.tokenKey = tokenKey;
        this.password = password;
        this.dateCreated = new Date().toLocaleDateString();
        this.token = token;
    }
    static async initUser(username, password) {
        const salt = generateSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const tokenKey = generateTokenKey();
        const token = jwt.sign({ userId: username }, tokenKey, { expiresIn: "1h" });
        return new User(username, hashedPassword, salt, token, tokenKey);
    }
}
