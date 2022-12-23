import express from 'express';
import cors from 'cors';

import usersRouters from "./routes/auth.routes.js";
import urlsRouters from "./routes/url.routes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters);
app.use(urlsRouters)



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`rodando na porta ${port}`));