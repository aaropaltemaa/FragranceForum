const fragranceRouter = require('express').Router()
const Fragrance = require('../models/fragrance')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const mongoose = require('mongoose')

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, 'uploads/')
  },
  filename: (request, file, callback) => {
    callback(null, `${Date.now()}-${file.originalname}`)
  },
})

const upload = multer({ storage })

fragranceRouter.get('/', async (request, response) => {
  const fragrances = await Fragrance.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(fragrances)
})

fragranceRouter.get('/:id', async (request, response) => {
  const fragrance = await Fragrance.findById(request.params.id)
  if (fragrance) {
    response.json(fragrance)
  } else {
    response.status(404).end()
  }
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

fragranceRouter.get(
  '/:fragranceId/reviews/:reviewId/comments',
  async (request, response) => {
    const { id } = request.params // Fragrance ID
    try {
      const fragrance = await Fragrance.findById(id)
      if (!fragrance) {
        return response.status(404).json({ error: 'Fragrance not found' })
      }
      response.json(fragrance.reviews)
    } catch (error) {
      response.status(500).json({ error: error.message })
    }
  }
)

fragranceRouter.post('/', upload.single('image'), async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  if (!request.file) {
    return response.status(400).json({ error: 'Image file is missing' })
  }

  let imageUrl = request.file.filename
  if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
    imageUrl = `${process.env.STATIC_FILES_BASE_URL}/uploads/${imageUrl}`
  }

  const fragrance = new Fragrance({
    name: body.name,
    brand: body.brand,
    type: body.type,
    description: body.description,
    notes: body.notes || [], // Adjusted to use a single list
    longevityRating: body.longevityRating,
    sillageRating: body.sillageRating,
    user: user._id,
    reviews: body.reviews || [],
    imageUrl: body.imageUrl,
    likes: body.likes || 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  try {
    const savedFragrance = await fragrance.save()
    response.status(201).json(savedFragrance)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

const isValidObjectId = id => mongoose.Types.ObjectId.isValid(id)

fragranceRouter.post('/:fragranceId/reviews', async (req, res) => {
  const { fragranceId } = req.params
  const { userId, reviewText } = req.body

  try {
    if (!userId || !reviewText) {
      return res.status(400).send('User ID and review text are required')
    }

    const fragrance = await Fragrance.findById(fragranceId)
    if (!fragrance) {
      return res.status(404).send('Fragrance not found')
    }

    const newReview = {
      reviewId: new mongoose.Types.ObjectId(),
      comments: [],
    }

    fragrance.reviews.push(newReview)
    await fragrance.save()

    res.status(200).json({ reviewId: newReview.reviewId })
  } catch (error) {
    console.error(error)
    res.status(500).send('Internal Server Error')
  }
})

fragranceRouter.post(
  '/:fragranceId/reviews/:reviewId/comments',
  async (req, res) => {
    const { fragranceId, reviewId } = req.params
    const { userId, comment } = req.body

    try {
      if (!isValidObjectId(fragranceId) || !isValidObjectId(reviewId)) {
        return res.status(400).send('Invalid fragrance ID or review ID')
      }
      if (!userId || !comment) {
        return res.status(400).send('User ID and comment are required')
      }

      const fragrance = await Fragrance.findById(fragranceId)
      if (!fragrance) {
        return res.status(404).send('Fragrance not found')
      }

      const review = fragrance.reviews.id(reviewId)
      if (!review) {
        return res.status(404).send('Review not found')
      }

      review.comments.push({
        user: mongoose.Types.ObjectId(userId),
        comment,
        createdAt: new Date(),
      })

      await fragrance.save()

      res.status(200).send('Comment added successfully')
    } catch (error) {
      console.error('Error adding comment:', error)
      res.status(500).send('Internal Server Error')
    }
  }
)

fragranceRouter.delete('/:id', async (request, response) => {
  const fragrance = await Fragrance.findById(request.params.id)
  if (!fragrance) {
    return response.status(404).json({ error: 'Fragrance not found' })
  }
  await Fragrance.findByIdAndDelete(request.params.id)
  await User.updateOne(
    { _id: fragrance.user },
    { $pull: { fragrances: request.params.id } }
  )
  response.status(204).end()
})

fragranceRouter.put('/:id', async (request, response) => {
  const body = request.body

  const fragrance = {
    name: body.name,
    brand: body.brand,
    type: body.type,
    description: body.description,
    notes: body.notes || [], // Adjusted to use a single list
    longevityRating: body.longevityRating,
    sillageRating: body.sillageRating,
    reviews: body.reviews || [],
    imageUrl: body.imageUrl,
    likes: body.likes,
    updatedAt: new Date(),
  }

  const updatedFragrance = await Fragrance.findByIdAndUpdate(
    request.params.id,
    fragrance,
    { new: true }
  )
  response.json(updatedFragrance)
})

module.exports = fragranceRouter
