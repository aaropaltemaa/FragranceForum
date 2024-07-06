const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('assert')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Fragrance = require('../models/fragrance')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Fragrance.deleteMany({})
  await Fragrance.insertMany(helper.initialFragrances)
})

test('fragrances are returned as json', async () => {
  await api
    .get('/api/fragrances')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('POST api/fragrances/reviews - a valid review can be added to a specific id', async () => {
  const fragrancesAtStart = await helper.fragrancesInDb()
  const fragranceToReview = fragrancesAtStart[0]

  const newReview = {
    userId: '667d9227a94eb15cadffa758',
    comment: 'Test Review Comment',
  }

  await api
    .post(`/api/fragrances/${fragranceToReview.id}/reviews`)
    .send(newReview)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const fragrancesAtEnd = await helper.fragrancesInDb()
  const updatedFragrance = fragrancesAtEnd[0]

  expect(updatedFragrance.reviews).toHaveLength(
    fragranceToReview.reviews.length + 1
  )
})

after(async () => {
  await mongoose.connection.close()
})
