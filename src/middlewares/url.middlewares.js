
import connection from "../database/db.js";
import { shortenSchema } from "../models/url.joi.js";

export const shortenValidate = async (req,res,next)=>{
  
    const {url} = req.body;
 

    const {error} = shortenSchema.validate({url},{abortEarly:false});
  

    if ( error ) {
        const errors = error.details.map((e)=>e.message);
       
        return res.status(422).send({message:errors})
    }

    next();
}

export const validateUrlId = async (req,res,next)=>{
    const {id} = req.params;
console.log(id)
 
        const url = await connection.query(
            `SELECT * FROM urls WHERE id=$1;`,[id]
        )
        console.log(url)
        if(url.rows.length===0){
            return res.sendStatus(404)
        }
        res.locals.url = url.rows[0];
        console.log(url.rows[0])
        next();
  
}


export const validateRedirectUrl = async (req,res,next) => {
    const {shortUrl} = req.params;

    const urls = await connection.query(
        `SELECT * FROM urls WHERE "shortUrl"=$1;`,[shortUrl]
    )
    if (urls.rows.length===0){
        return res.sendStatus(404);
    }

    res.locals.url = urls.rows[0];
    next();
}