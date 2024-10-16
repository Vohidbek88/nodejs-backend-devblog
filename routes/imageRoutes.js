import { Image } from '../models/imageModel.js';
import multer from 'multer';
import express from 'express'
const router = express.Router();


const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
            cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage});

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (
            !req.file
        ) {
            return res.status(400).send({ message: "Image Send all required input !!!" })
        }

        console.log(req.file);
        const img = await Image.create({ image: req.file.filename });
        return res.status(201).json(img)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router