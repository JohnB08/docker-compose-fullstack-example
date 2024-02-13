import { useEffect, useState } from "react";


type APIresponse<T> = [
    data: T|null,
    error: any
]


export const mainUrl = "http://localhost:3000"

export function useFetch<T>(url: string, options: RequestInit|null): APIresponse<T>{
    const [data, setData] = useState<T|null>(null)
    const [error, setError] = useState<any>(null)

    useEffect(()=>{
        const fetchApi = async()=>{
            if (!options) return
            try{
                const response = await fetch(url, options)
                const result = await response.json()
                setData(result)
            } catch (error){
                setError(error)
            }
        }
        fetchApi()
    }, [url, options])
    return [data, error]
}
