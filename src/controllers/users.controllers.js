import connection from "../database/db.js"
import { v4 as uuid} from 'uuid';

export async function postSignUp(req,res){

    const {name, email, password, confirmPassword} = req.body;

    const cryptedPassword = bcrypt.hashSync(password,10);


    try{
        await connection.query(
            `INSERT INTO users ("name", "email", "password") 
            VALUES ($1,$2,$3)`,
            [name, email, password]) 
            res.sendStatus(201)
    } catch (err){

        res.sendStatus(500);
    }
}