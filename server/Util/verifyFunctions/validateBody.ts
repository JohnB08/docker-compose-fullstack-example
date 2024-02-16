type userToken = {
    token: string
}

type userBody = {
    username: string
    password: string
}

/**
 * Validerer urlbody som en token login request
 * @param body 
 * @returns boolean
 */
export const validateAsToken = (body: any): body is userToken => {
    return(
        typeof body === "object" &&
        typeof (body as userToken).token === "string"
    )
}


/**
 * validerer urlbody som en user login request
 * @param body 
 * @returns boolean
 */
export const validateAsUserBody = (body: any): body is userBody =>{
    return(
        typeof body === "object" &&
        typeof (body as userBody).username === "string" &&
        typeof (body as userBody).password === "string"
    )
}