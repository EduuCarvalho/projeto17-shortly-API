import connection from "../database/db.js"
import { v4 as uuid} from 'uuid';
import bcrypt from "bcrypt";

export async function postSignUp(req,res){

    const {name, email, password} = req.body;

    const cryptedPassword = bcrypt.hashSync(password,10);


    try{
        await connection.query(
            `INSERT INTO users ("name", "email", "password") 
            VALUES ($1,$2,$3);`,
            [name, email, cryptedPassword]) 
            res.sendStatus(201)
    } catch (err){

        res.sendStatus(500);
    }
}