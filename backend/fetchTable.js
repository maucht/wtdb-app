const {createPool} = require("mysql2")

export const pool = createPool({
    host:'localhost',
    user:'root',
    password:'admin',
})