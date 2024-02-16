import { pool as db } from "../../db.js";
/**
 * prøver å finne en bruker basert på brukernavn
 * @param userName
 * @returns object{data/error success:boolean}
 */
export const fetchUser = async (userName) => {
    try {
        const data = await db.query("SELECT * FROM users WHERE userName = $1", [userName]);
        return { data, success: true };
    }
    catch (err) {
        return { err, success: false };
    }
};
