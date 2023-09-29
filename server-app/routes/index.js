var express = require('express');
var router = express.Router();
var User = require('../models/User');
var jwt = require('jsonwebtoken');
const config = require('../configs/config.json');
const { Response } = require('../helpers/util');

router.post('/login', async function (req, res, next) {
  try {
    const { email, password } = req.body
    console.log(email, password)

    const user = await User.findOne({ email })

    if (!user) throw Error("user doesn't exist")

    if (!user.checkPassword(password)) throw Error('password is wrong')

    const token = jwt.sign({ userid: user._id }, config.secretKey);

    res.json(new Response({
      email: user.email,
      token
    }))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err.message }, false))
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

    res.status(201).json(new Response({
      email: userCreated.email,
      token
    }))
  } catch (err) {
    console.log(err)
    res.status(500).json(new Response({ message: err.message }, false))
  }
});

module.exports = router;
