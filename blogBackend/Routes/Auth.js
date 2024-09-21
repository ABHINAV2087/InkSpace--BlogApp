const express = require('express');
const router = express.Router();

const User = require('../Models/UserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const errHandler = require('../Middleware/errorMiddleware')
const dotenv = require('dotenv');
dotenv.config();
const authTokenHandler = require('../Middleware/checkAuthToken');

function createResponse(ok, message, data) {
    return {
      ok,
      message,
      data,
    };
  }

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    }
})

  
router.get('/test', async (req, res) => {
    res.json({
        message: "user api is working"
    })
})

router.post('/sendotp', async (req, res) => {
    const { email } = req.body;
    const otp = Math.floor(1000 + Math.random() * 900000);
    try {

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "OTP Verification of InkSpace",
            text:`Your OTP for verification is ${otp}`
        }

        transporter.sendMail(mailOptions, async (err, info) => {
            if (err) {
                console.log(err);
                res.status(500).json(createResponse(false, err.message));
            }
            else{
                res.json(createResponse(true, 'OTP sent successfully', { otp }));
            }
        })

    } catch (err) {
        next(err);
        res.status(500).json(createResponse(false, err.message));
    }
})

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json(createResponse(false, 'Email already exists'));
        }
        const newUser = new User({
            name,
            password,
            email
        })

        await newUser.save();

        res.status(201).json(createResponse(true, 'User registered successfully'));

    } catch (err) {
        next(err)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json(createResponse(false, 'Invalid credentials'));
        }

        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '10m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_KEY, { expiresIn: '1d' });

        res.cookie('authToken', authToken, { 
            httpOnly: true, 
            secure: true, // Only send cookies over HTTPS
            sameSite: 'None'  // Required for cross-origin cookies
        });
        res.cookie('refreshToken', refreshToken, { 
            httpOnly: true, 
            secure: true, 
            sameSite: 'None' 
        });

        res.status(200).json(createResponse(true, 'Login successful', {
            authToken,
            refreshToken
        }));

    } catch (err) {
        next(err);
    }
});


router.get('/checklogin', authTokenHandler, async (req, res) => {
    res.json({
        ok: true,
        message: 'User authenticated successfully'
    })
})

router.use(errHandler)

module.exports = router;
