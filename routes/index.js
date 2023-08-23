var express = require('express');
var router = express.Router();
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
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
  const { username, password } = req.body;
  
  try {
      const user = await User.findOne({ username });
      if (user && user.password === password) {
          res.status(200).send("Login successful");
      } else {
          res.status(401).send("Invalid credentials");
      }
  } catch (error) {
      res.status(500).send("Error logging in");
  }
});

module.exports = router;
