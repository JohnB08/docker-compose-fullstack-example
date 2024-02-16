type userToken = {
    token: string
}

type userBody = {
    username: string
    password: string
}

export const validateAsToken = (body: any): body is userToken => {
    return(
        typeof body === "object" &&
        typeof (body as userToken).token === "string"
    )
}

export const validateAsUserBody = (body: any): body is userBody =>{
    return(
        typeof body === "object" &&
        typeof (body as userBody).username === "string" &&
        typeof (body as userBody).password === "string"
    )
}