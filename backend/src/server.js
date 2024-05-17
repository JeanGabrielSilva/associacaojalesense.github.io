import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/router.js';
import connectDB from './database/connection.js';
import connectToMySQL from './database/sql.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
// Obtém o caminho absoluto para o diretório "uploads"
const uploadsDirectory = path.join(__dirname, '../uploads');

// Configuração para servir arquivos estáticos da pasta "uploads"
app.use('/uploads', express.static(uploadsDirectory));
dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8001;
connectDB();
connectToMySQL();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
