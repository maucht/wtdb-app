import axios from "axios";


// REPLACE GET IP ADDRESS WITH NEW IP ADDRESS
// http://172.23.74.148:3000/all
// http://10.0.0.18:3000/all

export function promiseFullList(){
    return new Promise((resolve,reject)=>{
        axios.get("http://172.23.74.148:3000/all")
        .then((res)=>{
            const resData = res.data
            resolve(resData);
        })
        .catch((error)=>{
            console.error("Error in getFullList():",error)
            reject(error);
        })
})
}