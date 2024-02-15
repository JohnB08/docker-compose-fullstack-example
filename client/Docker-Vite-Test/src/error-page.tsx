import { useRouteError } from "react-router-dom";




export default function ErrorPage(){

    type Error = {
        statusText: string
        message: string
    }

    const isError = (error: unknown): error is Error =>{
        return(
            typeof error === "object" && error!== null &&
            typeof (error as Error).statusText === "string" &&
            typeof (error as Error).message === "string"
        )
    }
    const error = useRouteError();
    console.error(error)

    const errorCheck = isError(error)


    return(
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorCheck ? error.statusText || error.message : ""}</i>
      </p>
    </div>
    )
}