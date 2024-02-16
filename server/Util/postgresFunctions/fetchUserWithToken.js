import { pool as db } from "../../db.js";
export const fetchUserWithToken = async (token) => {
    try {
        const data = await db.query("SELECT * FROM users WHERE token = $1", [token]);
        return { data, success: true };
    }
    catch (err) {
        return { err, success: false };
    }
};
