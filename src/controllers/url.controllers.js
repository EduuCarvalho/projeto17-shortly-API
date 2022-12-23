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

export async function getUrl (req,res) {

    const {url}= res.locals;

    try{
  res.status(201).send({
    id: url.id,
    shortUrl:url.shortUrl,
    url:url.url

  })

}catch(err){
    res.sendStatus(500);
}
}

export async function getRedirectUrl (req,res){

    const {url} = res.locals;

    try{
        await connection.query(
            `UPDATE urls SET "visitCount" = "visitCount" +1 WHERE id=$1;`,[url.id]
        )
        res.redirect(url.url);
    }catch (err){
        res.sendStatus(500);
    }

}