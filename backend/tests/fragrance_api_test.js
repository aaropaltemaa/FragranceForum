import { describe, it, expect, beforeEach, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import fragranceRouter from '../controllers/fragrances'
import Fragrance from '../models/fragrance'

vi.mock('../models/fragrance')

const app = express()
app.use(express.json())
app.use('/fragrances', fragranceRouter)

describe('Fragrance Controller', () => {
  beforeEach(() => {
    vi.resetAllMocks()

    // Setup mock implementations
    Fragrance.find.mockResolvedValue([{ name: 'Test Fragrance' }])
    Fragrance.findById.mockResolvedValue({ name: 'Test Fragrance', _id: '1' })
    Fragrance.findByIdAndUpdate.mockResolvedValue({
      name: 'Updated Fragrance',
      _id: '1',
    })
    Fragrance.findByIdAndDelete.mockResolvedValue(true)
  })

  it('GET / should return all fragrances', async () => {
    const response = await request(app).get('/fragrances')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual([{ name: 'Test Fragrance' }])
  })

  it('GET /:id should return a fragrance if found', async () => {
    const response = await request(app).get('/fragrances/1')
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ name: 'Test Fragrance', _id: '1' })
  })

  it('POST / should create a new fragrance', async () => {
    const newFragrance = {
      name: 'New Fragrance',
      brand: 'New Brand',
      type: 'Eau de Parfum',
      description: 'A new fragrance description',
      notes: { top: ['Lemon'], middle: ['Jasmine'], base: ['Musk'] },
      rating: 5,
      reviews: [],
    }

    const response = await request(app).post('/fragrances').send(newFragrance)
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('name', newFragrance.name)
  })

  it('DELETE /:id should delete a fragrance', async () => {
    const response = await request(app).delete('/fragrances/1')
    expect(response.statusCode).toBe(204)
  })

  it('PUT /:id should update a fragrance', async () => {
    const updatedFragrance = {
      name: 'Updated Fragrance',
      brand: 'Updated Brand',
    }

    const response = await request(app)
      .put('/fragrances/1')
      .send(updatedFragrance)
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('name', updatedFragrance.name)
  })
})
