import { pool } from "../backend/fetchTable";
import { executeShellSearch } from "../backend/executeSql";
var fetchedShellList = executeShellSearch();
it('should fetch to mysql database',()=>{ // this should not be passing
    expect(fetchedShellList).toBe(undefined)
})
it('should fetch the correct values from mysql',()=>{
    pool.query("SELECT * FROM ammo WHERE ShellName = 'M72'"),(err,res)=>{
        console.log(res[0].ShellCaliber)
        expect(res[0].ShellCaliber).toBe(73)
    }
})