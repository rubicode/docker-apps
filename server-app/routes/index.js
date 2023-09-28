var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('../configs/config.json')

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) throw Error("user doesn't exist") // email or password wrong

    if (!user.checkPassword(password)) throw Error('password is wrong') // email or password wrong

    const token = jwt.sign({ userid: user._id }, config.secretKey);

    res.json({
      success: true,
      data: {
        email: user.email,
        token
      }
    })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
});

router.post('/register', async function (req, res, next) {
  try {
    const { email, password, repassword } = req.body

    if (password !== repassword) throw Error("password doesn't match")

    const user = await User.findOne({ email })

    if (user) throw Error("email already exist")

    const userCreated = await User.create({ email, password })
    const token = jwt.sign({ userid: userCreated._id }, config.secretKey);

    res.status(201).json({
      success: true,
      data: {
        email: userCreated.email,
        token
      }
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: err.message })
  }
});

module.exports = router;
