import { nanoid } from "nanoid";
import connection from "../database/db.js";


export async function postShortUrl (req,res) {

    const newUrl = nanoid(9);
    const {url} = req.body;
    const {session} = res.locals;

   
   
    try{
        await connection.query(
            `INSERT INTO urls (url,"shortUrl","userId") VALUES ($1,$2,$3);`,[url,newUrl,session.userId]
        )

        res.sendStatus(201);
    }catch (err){
        res.sendStatus(504);
    }
}