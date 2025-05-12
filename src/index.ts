import express from 'express';
import {loginRoutes} from "../src/routes/login.routes";
import { projetoRoutes } from "./routes/projeto.routes";
import { blogRoutes } from './routes/blog.routes';
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json())

app.get('/', (req, res) => {
    res.send({ message: 'Servidor conectado!' })
})

app.use(loginRoutes.bind())
app.use(projetoRoutes.bind())
app.use(blogRoutes.bind())

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})