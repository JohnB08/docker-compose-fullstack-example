import { useState } from 'react'
import './App.css'
import { useFetch, mainUrl } from './Utils/Hooks/Fetch'
import { useDebouncedCallback } from 'use-debounce'

function App() {
  const [url, setUrl] = useState<string>(mainUrl)
  const [options, setOptions] = useState<RequestInit | null>(null)
  const [data, error] = useFetch(url, options)
  const [name, setName] = useState<string>("")
  const [pw, setPw] = useState<string>("")


  const testUserServer = (name: string, pw: string) =>{
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
  console.log(data,error)
const updateName = useDebouncedCallback((name)=>{
  setName(name)
}, 1000)

  console.log(name)
const updatePw = useDebouncedCallback((pw)=>{
  setPw(pw)
}, 1000)
  console.log(pw)
  return (
    <>
    <div className='mainContainer'>
      <div className='inputContainer'>
        <label htmlFor="nameInput">Input Name <input type="text" name="nameInput" id="nameInput" defaultValue="" onChange={(e)=>updateName(e.target.value)}/> </label>
        <label htmlFor="pwInput">Input Password <input type="text" name="pwInput" id="pwInput" defaultValue="" onChange={(e)=>updatePw(e.target.value)}/> </label>
      </div>
      <div className='buttonContainer'>
        <button onClick={()=>testUserServer(name, pw)}>
          Test Create User
        </button>
        <button onClick={()=>testUserLogin(name, pw)}>
          Test Login User
        </button>
      </div>
    </div>
    </>
  )
}

export default App
