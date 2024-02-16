/**
 * Validerer urlbody som en token login request
 * @param body
 * @returns boolean
 */
export const validateAsToken = (body) => {
    return (typeof body === "object" &&
        typeof body.token === "string");
};
/**
 * validerer urlbody som en user login request
 * @param body
 * @returns boolean
 */
export const validateAsUserBody = (body) => {
    return (typeof body === "object" &&
        typeof body.username === "string" &&
        typeof body.password === "string");
};
