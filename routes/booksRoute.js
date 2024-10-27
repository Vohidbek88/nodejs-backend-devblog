import { Book } from '../models/bookModel.js';
import express from 'express';
import { User } from '../models/userModel.js';
const router = express.Router();



router.post('/', async (req, res) => {
    try {
        if (
            String(req.body.title).trim()=='' ||
            String(req.body.author).trim()=='' ||
            String(req.body.publishYear).trim()=='' ||
            String(req.body.email).trim()=='' ||
            !req.body.imageObject
        ) {
            return res.status(400).send({ message: "Maydonlar to'g'ri tartibda to'ldirilmadi !!!" })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            email: req.body.email,
            imageObject: req.body.imageObject
        }
        const book = await Book.create(newBook);
        return res.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})


router.get('/', async (req, res) => {
    try {
        const Books = await Book.find({});
        return res.status(200).json({
            count: Books.length,
            data: Books
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})



router.put('/:id', async (req, res) => {
    try {
        if (
           String(req.body.title).trim()=='' || 
            String(req.body.author).trim()=='' || 
            String(req.body.publishYear).trim()=='' || 
            String(req.body.email).trim()=='' ||
            !req.body.imageObject
        ) {
            return res.status(400).send({ message: "Maydonlar to'g'ri tartibda to'ldirilmadi !!!" })
        }

        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book update successfuly!!!" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id,{new:true});
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book deleted successfuly!!!" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})

router.put('/status/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body
        const result = await Book.findByIdAndUpdate(id, {
            status
        }, { new: true });
        if (!result) {
            return res.status(404).send({ message: "Book not found" });
        }
        return res.status(200).send({ message: "Book status change successfuly!!!" })

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


router.put('/savelike/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { likecount } = req.body
        await Book.findByIdAndUpdate(id, {
            likecount
        },

            { new: true });
        return res.status(200).send({ message: "Book like change successfuly!!!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


router.post('/statuslike/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.idCard) {
            return res.status(400).send({ message: "Like status id  required!!!" })
        }

        await User.findByIdAndUpdate(id, {$push:{savedLike:req.body.idCard}},{new:true})
        return res.status(200).send({ message: "Like status change successfully!!!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})


router.put('/statuslike/:id', async (req, res) => {
    try {
        const { id } = req.params;

        if (!req.body.idCard) {
            return res.status(400).send({ message: "Like status id  required!!!" })
        }

        await User.findByIdAndUpdate(id, {$pull:{savedLike:req.body.idCard}},{new:true})
        return res.status(200).send({ message: "Like status change successfully!!!" })
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message })
    }
})



export default router