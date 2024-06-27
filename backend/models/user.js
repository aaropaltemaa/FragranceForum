const mongoose = require('mongoose')
const fragrance = require('./fragrance')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
  },
  name: String,
  passwordHash: {
    type: String,
    required: true,
  },
  fragrances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fragrance',
    },
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

module.exports = mongoose.model('User', userSchema)
