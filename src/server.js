import express from 'express';
import cors from 'cors';

import usersRouters from "./routes/auth.routes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters);



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`rodando na porta ${port}`));