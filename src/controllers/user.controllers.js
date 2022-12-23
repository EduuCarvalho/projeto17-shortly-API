import connection from "../database/db.js";


export async function usersDataByToken (req,res){

    const { session } = res.locals;
    const userId = session.userId

    try {
        const user = await connection.query(
            `SELECT * FROM users WHERE id=$1;`,[userId]
        )
        console.log("to aki")
        const countVisit = await connection.query(
            `SELECT SUM("visitCount") FROM urls WHERE "userId"= $1;`, [userId]
        )
      
       
            console.log(countVisit.rows[0],"visista")


        const urls = await connection.query(
            `SELECT id, url,"shortUrl","visitCount" FROM urls WHERE "userId"= $1;`, [userId]);


        const result = [{
            user:userId,
            name:user.rows[0].name,
            visitCount:countVisit.rows[0].sum,
            shortenedUrls:urls.rows
        }]

        res.send(result)

    
    }catch (err){
     
        res.sendStatus(505);
    }
}
