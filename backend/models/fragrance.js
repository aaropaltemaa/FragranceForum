const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
console.log('connecting to', url)
mongoose
  .connect(url)
  .then(res => {
    console.log('connected to MongoDB')
  })
  .catch(err => {
    console.log('error connecting to MongoDB:', err.message)
  })

const fragranceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: [
      'Eau de Parfum',
      'Eau de Toilette',
      'Eau de Cologne',
      'Parfum',
      'Body Mist',
      'Other',
    ],
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  notes: {
    top: [String],
    middle: [String],
    base: [String],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

fragranceSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

fragranceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Fragrance', fragranceSchema)
