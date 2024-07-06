const mongoose = require('mongoose')

const longevityLabels = {
  0.5: '0-1 hours',
  1: '1-2 hours',
  1.5: '2-3 hours',
  2: '3-4 hours',
  2.5: '4-5 hours',
  3: '5-6 hours',
  3.5: '6-8 hours',
  4: '8-10 hours',
  4.5: '10-12 hours',
  5: '12+ hours',
}

const sillageLabels = {
  0.5: 'Barely Noticeable',
  1: 'Faint',
  1.5: 'Subtle',
  2: 'Mild',
  2.5: 'Moderate',
  3: 'Noticeable',
  3.5: 'Strong',
  4: 'Very Strong',
  4.5: 'Potent',
  5: 'Overwhelming',
}

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
      'Extrait de Parfum',
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
  notes: [String],
  longevityRating: {
    type: Number,
    enum: Object.keys(longevityLabels).map(Number), // Convert keys to Number
    required: false,
  },
  sillageRating: {
    type: Number,
    enum: Object.keys(sillageLabels).map(Number), // Convert keys to Number
    required: false,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [
    {
      reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose.Types.ObjectId(),
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
      comments: [
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
          createdAt: {
            type: Date,
            default: Date.now,
          },
        },
      ],
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
