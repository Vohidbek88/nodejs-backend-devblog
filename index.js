import express from 'express';
import { PORT } from './config.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import usersRoute from './routes/usersRoute.js'
import imageRoute from './routes/imageRoutes.js'
import cors from 'cors';

const app = express();



app.use(express.json({limit:'18mb'}))
app.use(cookieParser())
app.use(express.urlencoded({limit:'18mb',extended:true}))
app.use(cors({ origin:'http://localhost:5173', allowedHeaders:['Content-Type','Cache-Control'],credentials:true,}))

app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("WELOCOME!!!")
})

app.use('/books',booksRoute);
app.use('/user',usersRoute);
app.use('/image',imageRoute)



mongoose.connect('mongodb://localhost:27017/mern-stack')
    .then(() => {
        console.log('App connected database successful!!');
        app.listen(PORT, () => {
            console.log(`App listening project port:${PORT}`);
        })
    })
    .catch(error => {
        console.log(error);
    })