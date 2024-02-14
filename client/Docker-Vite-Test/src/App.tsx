import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useFetch, mainUrl } from './Utils/Hooks/Fetch'

function App() {
  const [count, setCount] = useState(0)
  const [url, setUrl] = useState(mainUrl)
  const [options, setOptions] = useState<RequestInit | null>(null)
  const [data, error] = useFetch(url, options)


  const testUserServer = () =>{
    const serverUrl = mainUrl + "/create"
    setUrl(serverUrl)
    const requestHeaders: RequestInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({
        username: "Bjarne",
        password: "123456"
      })
    }
    setOptions(requestHeaders)
  }

  const testUserLogin = () =>{
    const serverUrl = mainUrl + "/login"
    setUrl(serverUrl)
    const requestHeaders: RequestInit = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username: "Bjarne",
        password: "123456"
      })
    }
    setOptions(requestHeaders)
  }
  console.log(data,error)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={()=>testUserServer()}>
          Test Create User
        </button>
        <button onClick={()=>testUserLogin()}>
          Test Login User
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
