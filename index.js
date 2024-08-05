import express from 'express';
import mongoose from 'mongoose';
import {routerAPI} from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost:27017/apiPost', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB: '));
db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get('/', (req,res) => {
    res.status(200).send('Crud Posts');
})

routerAPI(app);

app.listen(3000, () => {
    console.log('Servidor en el puerto ' + port)
})