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

export async function deleteUrlById (req,res){

    const {url} = res.locals;

    try{
        await connection.query(
            `DELETE FROM urls WHERE id=$1;`,[url.id]
        );
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500);
    }
}


export async function getRanking(req,res){
    try{

      const ranking = await connection.query (`SELECT users.id, users.name, 
      COUNT(urls.id) AS "linksCount", 
      SUM(urls."visitCount") AS "visitCount" 
      FROM urls 
      LEFT JOIN users  ON urls."userId" = users.id
       GROUP BY users.id 
       ORDER BY "visitCount" 
       DESC LIMIT 10;`);;
     
      res.status(200).send(ranking.rows);
    }catch(err){
      console.log(err);
      res.sendStatus(500);
  }
  }
