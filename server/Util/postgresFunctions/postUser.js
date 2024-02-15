import { pool as db } from "../../db.js";
export const postNewUser = async (user) => {
    const { username, password, token, tokenKey, dateCreated, saltRounds } = user;
    try {
        let data = await db.query("INSERT INTO users (userName, password, token, tokenKey, dateCreated, saltRounds) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", [username, password, token, tokenKey, dateCreated, saltRounds]);
        return { data, success: true };
    }
    catch (err) {
        return { err, success: false };
    }
};
