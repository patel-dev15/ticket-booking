import { createPool } from "mysql2";
import mysql2 from "mysql2/promise";
const db = mysql2.createPool({
    host:"localhost",
    database:"digi",
    user:"root",
    password:""
})



export default db