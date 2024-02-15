import { useLocation } from "react-router-dom"


export const User = () =>{
    const location = useLocation()
    const { user } = location.state
    return(
        <>
        <div>
            <h1>
                Welcome, {user.username}
            </h1>
            <p>You were created {user.datecreated}</p>
        </div>
        </>
    )
}