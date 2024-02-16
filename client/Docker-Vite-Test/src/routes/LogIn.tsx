import { useState } from 'react'
import Style from './LogIn.module.css'
import { useFetch, mainUrl } from '../Utils/Hooks/Fetch'
import { useDebouncedCallback } from 'use-debounce'
import { useNavigate } from 'react-router-dom'
import { ValidData } from '../types/types'
function LogIn() {
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>(mainUrl)
  const [options, setOptions] = useState<RequestInit | null>(null)
  const [data, error, status] = useFetch(url, options)
  const [name, setName] = useState<string>("")
  const [pw, setPw] = useState<string>("")


  const validateData = (data: unknown): data is ValidData =>{
    return(
      typeof data === "object" &&
      data !== null &&
      typeof (data as ValidData).message === "string" &&
      typeof (data as ValidData).user === "object"
    )
  }

  const testUserCreate = (name: string, pw: string) =>{
    console.log("Trying To Create User")
    if (name.length === 0 || pw.length === 0) return
    const serverUrl = mainUrl + "/create"
    setUrl(serverUrl)
    const requestHeaders: RequestInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        username: name,
        password: pw
      })
    }
    setOptions(requestHeaders)
  }

  const testUserLogin = (name: string, pw: string) =>{
    console.log("Trying to Log In")
    if (name.length === 0 || pw.length === 0) return
    const serverUrl = mainUrl + "/login"
    setUrl(serverUrl)
    const requestHeaders: RequestInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: name,
        password: pw
      })
    }
    setOptions(requestHeaders)
  }

const testUserLoginWithToken = (token: string)=>{
  console.log(token)
  const loginUrl = mainUrl + "/login"
  setUrl(loginUrl)
  const requestHeaders: RequestInit = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      token: token
    })
  }
  setOptions(requestHeaders)
}

  console.log(data,error)
const updateName = useDebouncedCallback((name)=>{
  setName(name)
}, 1000)

if (status === 200 && validateData(data)){
  navigate("/user", {state: {user: data.user}})
}

  console.log(name)
const updatePw = useDebouncedCallback((pw)=>{
  setPw(pw)
}, 1000)
  console.log(pw)
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJTaWdyaWQiLCJpYXQiOjE3MDgwNzAzODYsImV4cCI6MTcwODA3Mzk4Nn0.d5jRv-BGcYZeXifstaZQZ9r6VHULl9pDwV5rAsXgb5I"

  return (
    <>
    <div className={Style.mainContainer}>
      <div className={Style.inputContainer}>
        <label htmlFor="nameInput">Input Name <input type="text" name="nameInput" id="nameInput" defaultValue="" onChange={(e)=>updateName(e.target.value)}/> </label>
        <label htmlFor="pwInput">Input Password <input type="text" name="pwInput" id="pwInput" defaultValue="" onChange={(e)=>updatePw(e.target.value)}/> </label>
      </div>
      <div className={Style.buttonContainer}>
        <button onClick={()=>testUserCreate(name, pw)}>
          Test Create User
        </button>
        <button onClick={()=>testUserLogin(name, pw)}>
          Test Login User
        </button>
        <button onClick={()=>testUserLoginWithToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJHbGVubiBGcmVkcmlrIiwiaWF0IjoxNzA4MDc1NTg4LCJleHAiOjE3MDgwNzkxODh9.FX7INelIYS0_tAZiSPaM9wdbLtvexQom_lfPQ57dAVA")}>
          Test Token.
        </button>
      </div>
    </div>
    </>
  )
}

export default LogIn
