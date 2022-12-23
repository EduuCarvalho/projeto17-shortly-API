import connection from "../database/db.js";
import { signUpSchema } from "../models/usersJoi.js";

export const signUpValidations = async (req,res,next)=> {
    
    const {name, email, password, confirmPassword} = req.body;

   

    const {error} = signUpSchema.validate({name, email, password, confirmPassword},{abortEarly:false});

    if ( error ) {
        const errors = error.details.map((e)=>e.message);
        console.log("to aki")
        return res.status(422).send({message:errors})
    }
 
    const checkEmail = await connection.query(`SELECT * FROM users WHERE email=$1;`,[email])
    console.log(checkEmail)

    if (checkEmail.rows.length>0){
        return res.status(409).send({message:"E-mail já cadastrado!!!"})
    }

    next();
}
 