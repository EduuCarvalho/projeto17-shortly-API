import pkg from "pg";
import dotenv from "dotenv";
const { Pool } = pkg;
dotenv.config();

const connection = new Pool({connectionString:process.env.DATABASE_URL,ssl:true})



export default connection;
