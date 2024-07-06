const Fragrance = require('../models/fragrance')
const User = require('../models/user')

const initialFragrances = [
  {
    name: 'Test Fragrance 1',
    brand: 'Test Brand 1',
    type: 'Extrait de Parfum',
    description: 'Test Description 1',
    notes: ['Test Note 1', 'Test Note 2'],
    longevityRating: 5,
    sillageRating: 5,
    imageUrl: 'http://example.com/test1.jpg',
    user: '667d9227a94eb15cadffa758',
  },
  {
    name: 'Test Fragrance 2',
    brand: 'Test Brand 2',
    type: 'Extrait de Parfum',
    description: 'Test Description 2',
    notes: ['Test Note 3', 'Test Note 4'],
    longevityRating: 4,
    sillageRating: 4,
    imageUrl: 'http://example.com/test2.jpg',
    user: '667d9227a94eb15cadffa758',
  },
]

const fragrancesInDb = async () => {
  const fragrances = await Fragrance.find({})
  return fragrances.map(fragrance => fragrance.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialFragrances,
  fragrancesInDb,
  usersInDb,
}
