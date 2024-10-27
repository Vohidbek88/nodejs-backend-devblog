import express from "express";
import { User } from "../models/userModel.js";
import bcryptjs from 'bcryptjs'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Token from "../models/Token.js";
import verfiyEmail from "../util.js";

const route = express.Router();

//user create signup bolimi

route.post('/signup', async (req, res) => {

    try {
        const { username, email, password } = await req.body
        if (String(username).trim()=='' || String( email).trim()=='' || String(password).trim()=='') {
            return res.status(400).json({ message: 'All input required!!!' })
        }

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already exsist!!!' })
        }
        const salt = await bcryptjs.genSalt(10);

        const hashPassword = await bcryptjs.hash(password, salt)
        const newUser = {
            username,
            email,
            password: hashPassword
        }
        const createUser = await User.create(newUser);

        const token = await Token.create({ userId: createUser._id, token: crypto.randomBytes(16).toString('hex') })
        console.log(token);
        const link = `http://localhost:5555/user/confirm/${token.token}`;
        await verfiyEmail(email, link)
        return res.status(201).json({ message: 'Email send check your mail!!',link })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

//verify
route.get('confirm/:token', async (req, res) => {
    try {
        const token = await Token.findOne({
            token: req.params.token
        })
        console.log(token);
        await User.updateOne({ _id: token.userId }, { $set: { verfied: true } })
        await Token.findByIdAndDelete(token._id);
        return res.send({ message: "Email verified succesfully!!" })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//signin bolimi
route.post('/signin', async (req, res) => {

    try {
        const { email, password } = await req.body;


        if (String(email).trim()=='' || String(password).trim()=='') {
            return res.status(400).json({ message: 'All input required!!!' })
        }
        const user = await User.find({ email });
        console.log(user[0]);
        if (!user[0]) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcryptjs.compare(password, user[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Password Incorrect!" })
        }

        if (user[0] && !user[0].verfied) {

            const tokenData = {
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email,

            }
            console.log(tokenData);
            const jwttoken = jwt.sign(tokenData, 'HY99PIB55', { expiresIn: '1h' });
            console.log(jwttoken);
            res.cookie('token', jwttoken, { httpOnly: true, sameSite: 'None', secure: true });
            ; // Set the cookie first
            return res.status(200).json({ message: 'Login successfully!' }); // Changed status to 200

        }


    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//userni olish bolimi

route.get('/', async (req, res) => {

    const token = req.cookies['token']


    if (!token) {
        return res.status(404).json({ message: 'Token topilmadi!' })
    }

    try {
        const verify = jwt.verify(token, 'HY99PIB55');


        const user = await User.findById(verify.id);

        if (!user) {
            return res.status(404).json({ message: "User not found 404!!!" })
        }

        return res.status(200).json({ message: 'User get success!!!', user })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
})

//logout bolimi

route.delete('/logout', async (req, res) => {


    try {
        return res
            .clearCookie("token")
            .status(200)
            .json({ message: "Successfully logged out 😏 🍀" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default route