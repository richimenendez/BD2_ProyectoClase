import axios from "axios"

const url = 'http://192.168.1.18:3000'

export function getUsers(){
    let promise = axios.get(url+"/users")
    let data = promise.then((res)=>{console.log(res); return res.data})
    return data
}