import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const verifyPassword = async (user, password) => {
    return await bcrypt.compare(password, user.password);
};
export const verifyToken = async (user, token) => {
    return jwt.verify(token, user.tokenKey);
};
