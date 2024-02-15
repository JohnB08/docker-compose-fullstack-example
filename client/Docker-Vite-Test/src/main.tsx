import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from "react-router-dom"
import Root from './routes/root'
import ErrorPage from './error-page'
import LogIn from "./routes/LogIn"
import { User } from './routes/User'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <ErrorPage />,
    children: [
  {
    path: "login",
    element: <LogIn />
  },
  {
    path: "user",
    element: <User />
  }
    ]
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>,
)
