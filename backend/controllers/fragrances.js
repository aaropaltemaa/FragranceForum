const fragranceRouter = require('express').Router()
const Fragrance = require('../models/fragrance')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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

fragranceRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(404).json({ error: 'User not found' })
  }

  const notes = {
    top: body.notes?.top || [],
    middle: body.notes?.middle || [],
    base: body.notes?.base || [],
  }

  const fragrance = new Fragrance({
    name: body.name,
    brand: body.brand,
    type: body.type,
    description: body.description,
    notes: notes,
    rating: body.rating,
    user: user._id,
    reviews: body.reviews || [],
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  const savedFragrance = await fragrance.save()
  user.fragrances = user.fragrances.concat(savedFragrance._id)
  await user.save()
})

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

  const notes = {
    top: body.notes?.top || [],
    middle: body.notes?.middle || [],
    base: body.notes?.base || [],
  }

  const fragrance = {
    name: body.name,
    brand: body.brand,
    type: body.type,
    description: body.description,
    notes: notes,
    rating: body.rating,
    reviews: body.reviews || [],
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
