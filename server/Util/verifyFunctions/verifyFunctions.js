import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 * boolean function som bruker bcrypt for å sammenligne lagret passord og clientpassord.
 * @param user
 * @param password
 * @returns
 */
export const verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};
/**
 * Prøver å validere en token basert på en bruker, og token.
 * @param user brukerobjekt fetcha fra server.
 * @param token string levert fra client.
 * @returns validert token, med token id eller error.
 */
export const verifyToken = async (user, token) => {
    try {
        const verifiedToken = jwt.verify(token, user.tokenkey);
        return verifiedToken;
    }
    catch (error) {
        return error;
    }
};
