import { promiseFullList } from "../backend/fetchTable";

it("should fetch the table correctly",()=>{
    promiseFullList().then((data)=>{
    expect(data).not.toBe(undefined)

})
})