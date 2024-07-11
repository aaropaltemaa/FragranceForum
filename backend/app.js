const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const fragranceRouter = require('./controllers/fragrances')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const registerRouter = require('./controllers/auth')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const path = require('path')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
app.use(middleware.requestLogger)

// Serve static files from 'uploads' directory
// const staticFilesBaseUrl =
//   process.env.STATIC_FILES_BASE_URL || `http://localhost:${config.PORT}`
// app.use(
//   '/uploads',
//   express.static(path.join(__dirname, 'uploads'), {
//     setHeaders: function (res, filePath) {
//       // Extract the file name from the filePath
//       const fileName = path.basename(filePath)
//       // Correctly set the Location header using the fileName
//       res.set('Location', staticFilesBaseUrl + '/uploads/' + fileName)
//     },
//   })
// )

app.use('/api/fragrances', fragranceRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/register', registerRouter)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
