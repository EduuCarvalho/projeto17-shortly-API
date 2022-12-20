import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors());
app.use(express.json());



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`rodando na porta ${port}`));