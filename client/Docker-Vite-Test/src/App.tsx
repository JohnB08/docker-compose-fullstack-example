import { ChangeEvent, useState } from 'react'
import './App.css'
import { useFetch, mainUrl } from './Utils/Hooks/Fetch'

function App() {
  const [url, setUrl] = useState<string>(mainUrl)
  const [options, setOptions] = useState<RequestInit | null>(null)
  const [data, error] = useFetch(url, options)
  const [name, setName] = useState<string>("")
  const [pw, setPw] = useState<string>("")


  const testUserServer = () =>{
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

  const testUserLogin = () =>{
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

  const updateName = (event: ChangeEvent<HTMLInputElement>) =>{
    setName(event.target.value)
  }
  console.log(name)
  const updatePw = (event: ChangeEvent<HTMLInputElement>) =>{
    setPw(event.target.value)
  }
  console.log(pw)
  return (
    <>
    <div className='mainContainer'>
      <div className='inputContainer'>
        <label htmlFor="nameInput">Input Name <input type="text" name="nameInput" id="nameInput" defaultValue="" onChange={updateName}/> </label>
        <label htmlFor="pwInput">Input Password <input type="text" name="pwInput" id="pwInput" defaultValue="" onChange={updatePw}/> </label>
      </div>
      <div className='buttonContainer'>
        <button onClick={()=>testUserServer()}>
          Test Create User
        </button>
        <button onClick={()=>testUserLogin()}>
          Test Login User
        </button>
      </div>
    </div>
    </>
  )
}

export default App
