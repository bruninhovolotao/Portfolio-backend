import express from 'express';
import {loginRoutes} from "../src/routes/login.routes";
import { projetoRoutes } from "./routes/projeto.routes";
import { blogRoutes } from './routes/blog.routes';
import cors from "cors";
import { UploadRoutes } from './routes/upload.routes';
import path from "path";

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send({ message: 'Servidor conectado!' })
})

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(loginRoutes.bind())
app.use(projetoRoutes.bind())
app.use(blogRoutes.bind())
app.use(UploadRoutes.bind())

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
})