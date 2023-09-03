var express = require('express');
var router = express.Router();
var User = require('../models/user');
const { default: axios } = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/register', async (req, res) => {
    const { newUsername, newPassword } = req.body;

    try {
        const newUser = new User({
            username: newUsername,
            password: newPassword
        });
        await newUser.save();
        res.status(200).send("Registration successful");
    } catch (error) {
        res.status(500).send("Error registering user");
    }
});

router.post('/login', async (req, res) => {
    let { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        // console.log("Find user:", user);

        if (user && user.password === password) {
            // console.log("match!!!");
            res.status(200).json({ code: 200, message: "Login successful" });
        } else {
            // console.log("no match!!")
            res.status(401).json({ code: 401, message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(500).json({ code: 500, message: "Error logging in" });
    }
});

module.exports = router;
