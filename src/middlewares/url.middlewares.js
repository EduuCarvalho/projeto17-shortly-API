
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

