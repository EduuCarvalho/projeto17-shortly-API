import { signUpSchema } from "../models/usersJoi.js";

export const signUpValidations = async (req,res,next)=> {
    
    const {body} = req;

    const {error} = signUpSchema.validate(body,{abortEarly:false});

    if ( error ) {
        const errors = error.details.map((e)=>e.message);
        return res.status(422).send({message:errors})
    }

    next();
}
 