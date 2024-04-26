import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/router.js';
import connectDB from './database/connection.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));

dotenv.config({path:'config.env'});
const PORT = process.env.PORT || 8001;
connectDB();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
