import { pool as db } from "../../db.js";
/**
 * Prøver å finne en bruker basert på tokens
 * @param token
 * @returns object{data/error, success:boolean}
 */
export const fetchUserWithToken = async (token) => {
    try {
        const data = await db.query("SELECT * FROM users WHERE token = $1", [token]);
        return { data, success: true };
    }
    catch (err) {
        return { err, success: false };
    }
};
