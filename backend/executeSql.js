import {pool} from './fetchTable.js'

export function executeShellSearch(){
    pool.query("SELECT * FROM ammo WHERE ShellName = 'M72'"),(err,res)=>{
        if(err){
            return -1;
        }
        else{
            console.log(res[0])
            return res[0];
        }
    }
}