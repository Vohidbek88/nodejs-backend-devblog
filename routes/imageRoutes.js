import { Image } from '../models/imageModel.js';
import multer from 'multer';
import express from 'express'
const router = express.Router();



const upload = multer({ limits: { fileSize: 18 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (
            !req.file
        ) {
            return res.status(400).send({ message: "Image Send all required input !!!" })
        }

        console.log(req.file);
        const img = await Image.create({ image: { data: req.file.buffer, contentType: req.file.mimetype } });
        return res.status(201).send(img)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        if (id == undefined) {
            return res.status(400).send({ message: "Bad request!!!" })
        }

        const singleImage = await Image.findById(id);
        return res.status(200).json(singleImage)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router