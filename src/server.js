import express from 'express';
import cors from 'cors';

import authRouters from "./routes/auth.routes.js";
import urlsRouters from "./routes/url.routes.js"
import usersRouters from "./routes/users.routes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(authRouters);
app.use(urlsRouters);
app.use(usersRouters);



const port = process.env.PORT || 4000;
app.listen(port,()=> console.log(`rodando na porta ${port}`));