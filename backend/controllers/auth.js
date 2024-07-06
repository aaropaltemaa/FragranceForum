const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { Router } = require('express')
const dotenv = require('dotenv')

dotenv.config()

const registerRouter = Router()

registerRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  console.log('username', username)
  console.log('password', password)

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'Username is already taken' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  const userForToken = {
    username: savedUser.username,
    id: savedUser._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60,
  })

  res
    .status(201)
    .json({ token, username: savedUser.username, id: savedUser._id })
})

module.exports = registerRouter
