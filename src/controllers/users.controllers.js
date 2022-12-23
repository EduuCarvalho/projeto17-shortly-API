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

export async function postSignIn(req,res){

   
    const user = res.locals.user;
    const token = uuid();
console.log(user)
    try{
      await connection.query(
        `INSERT INTO sessions(token,"userId") VALUES ($1,$2);`,[token,user.id]
      )
    res.sendStatus(200);
    } catch (err) {
        console.log(err)
        res.sendStatus(500);
       
    }
}

