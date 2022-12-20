import connection from "../database/db.js"

export async function postSignUp(req,res){

    const {name, email, password, confirmPassword} = req.body;


    try{
        await connection.query(
            `INSERT INTO users ("name", "email", "password", "confirmPassword") 
            VALUES ($1,$2,$3,$4)`,
            [name, email, password, confirmPassword]) 
            res.sendStatus(200)
    } catch (err){
        res.sendStatus(500);
    }
}