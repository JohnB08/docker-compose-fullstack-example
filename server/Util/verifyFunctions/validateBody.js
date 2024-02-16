export const validateAsToken = (body) => {
    return (typeof body === "object" &&
        typeof body.token === "string");
};
export const validateAsUserBody = (body) => {
    return (typeof body === "object" &&
        typeof body.username === "string" &&
        typeof body.password === "string");
};
