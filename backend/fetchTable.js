import axios from "axios";

export function promiseFullList(){
    return new Promise((resolve,reject)=>{
        axios.get("https://wtdb-backend.onrender.com/all")
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