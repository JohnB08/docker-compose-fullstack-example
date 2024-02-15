import Style from "./root.module.css"
import { Outlet, Link } from "react-router-dom"




export default function Root(){
    return (
    <div className={Style.Main}>
        <div className={Style.SideBar}>
            <h1>React Router Sidebar</h1>
            <div>
                <form action="" id="search-form" role="search">
                    <input type="search" name="q" id="q" aria-label="Search contacts" placeholder="search" />
                    <div id="search-spinner" aria-hidden hidden={true} />
                    <div className="sr-only" aria-live="polite"></div>
                </form>
                <form method="post">
                    <button type="submit">New</button>
                </form>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to={`/login`}> login/signup </Link>
                    </li>
                    <li>
                        <Link to={`/messages`}> messages</Link>
                    </li>
                    <li>
                        <Link to={`/user`}> user</Link>
                    </li>
                </ul>
            </nav>
        </div>
        <div className={Style.Details}>
            <Outlet />
        </div>
    </div>
    )
}