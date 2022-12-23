import connection from "../database/db.js";
import { signInSchema, signUpSchema } from "../models/auth.joi.js"
import bcrypt from "bcrypt";

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

export const signInValidations = async (req,res,next)=>{

    const {email, password} = req.body;

    const { errors } = signInSchema.validate({email, password},{abortEarly:false});
    if (errors){
        return res.status(422).send({message:errors});
    }

    const checkLogin = await connection.query(
        `SELECT * FROM users WHERE email=$1;`,[email]);

    const userPassword = bcrypt.compareSync(password,checkLogin.rows[0].password);
    if( checkLogin.rows.length===0 || !userPassword){
        return res.sendStatus(401);
    }

    res.locals.user= checkLogin.rows[0];
  
    next();
}

export const validateToken = async (req, res, next) => {

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    try {
      const findToken = await connection.query(
        `SELECT * FROM sessions WHERE token=$1`,
        [token]
      );
     
      if (!findToken.rowCount) return res.sendStatus(401);
console.log(findToken.rows[0])
      res.locals.session = findToken.rows[0];
      
      next();

    } catch (error) {
      res.sendStatus(500);
    }
  };