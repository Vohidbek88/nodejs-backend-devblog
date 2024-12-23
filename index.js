import express from 'express';
import { PORT } from './config.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js'
import usersRoute from './routes/usersRoute.js'
import imageRoute from './routes/imageRoutes.js'
import cors from 'cors';
import bodyParser from 'body-parser';
const app = express();


//https://devbloguz.netlify.app
app.use('/images',express.static('uploads'))
app.use(bodyParser.json({limit:'18mb'}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:'18mb',extended:true,parameterLimit:1000000}))
app.use(cors({ origin:'https://devbloguz.netlify.app', allowedHeaders:['Content-Type','Cache-Control'],credentials:true,}))
app.get('/', (req, res) => {
    console.log(req);
    return res.status(234).send("WELOCOME!!!")
})

app.use('/books',booksRoute);
app.use('/user',usersRoute);
app.use('/image',imageRoute);



//process.env.URL_MONGO
//'mongodb://localhost:27017/mern-stack'
const ConnetctionDb=async()=>{
    try {
      await  mongoose.connect('mongodb+srv://vohidabdunazarov88:WQgH3WXGSgWDOzL3@cluster0.ofu3b.mongodb.net/')
      console.log('Database connected!!!');
    } catch (error) {
        console.log('Database noconnect!!!');
    }
}

ConnetctionDb()

app.listen(PORT, () => {
    console.log(`App listening project port:${PORT}`);
})
