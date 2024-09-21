const Login = require("../models/LoginSchema");
const bcrypt = require('bcrypt');
require("dotenv").config();
const jwt = require("jsonwebtoken");


// login controller
exports.login = async (req, res) => {
    try {
        // fetch data
        const { email, password } = req.body;

        // check user in db
        const user = await Login.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found. Please create an account.",
                data: "Please Create Account"
            })
        }

        // password matching
        if (await bcrypt.compare(password, user.password)) {
            // matched password
            // console.log("password matched.")
            const paylod = {
                email: user.email,
                id: user._id,
            }

            let token = jwt.sign(paylod, process.env.JWT_SECRET_KEY,
                {
                    expiresIn: "2h"
                }
            )

            console.log("token created");
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }

            console.log("option created");
            // create cookie
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: 'Log in successfully',
            })
            // console.log("token send in the response.")

        } else {
            return res.status(500).json({
                success: false,
                message: "Incorrect password."
            })
        }
    } catch (error) {
        // console.log("catch error in login");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Can not be login. Please try again."
        })
    }
}

// sign up controller
exports.signup = async (req, res) => {
    try {
        // fetch data
        const {
            userName,
            email,
            password,
        } = req.body;

        // already exists
        const existingUser = await Login.findOne({ email: email });
        if (existingUser) {
            return res.status(500).json({
                success: false,
                message: "Already account created.",
                data:"User Already Exist."
            })
        }

        // hash password
        const hashPassword = await bcrypt.hash(password, 10);

        // create entry in db
       const user = await Login.create({
            userName: userName,
            email: email,
            password: hashPassword
        })

        user.password = undefined;
        //return res
       return res.status(200).json({
            success: true,
            message: 'User registered Successfully',
            data: user,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registrered. Please try again",
        })
    }
} 