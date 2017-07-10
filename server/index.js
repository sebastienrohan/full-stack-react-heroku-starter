const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const helmet = require('helmet')
const expressEnforcesSSL = require('express-enforces-ssl')

// load sensitive information
if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

// connect to the database and load models
require('./models').connect(process.env.MONGODB_URI)

const app = express()
const PORT = process.env.PORT || 5000

// priority serve any static files
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

// tell the app to parse HTTP body messages
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//  middleware for securing your app via HTTP headers & HTTPS
app.use(helmet())
app.enable('trust proxy')
app.use(expressEnforcesSSL())

// pass the passport middleware
app.use(passport.initialize())

// load passport strategies
const localSignupStrategy = require('./passport/local-signup')
const localLoginStrategy = require('./passport/local-login')
passport.use('local-signup', localSignupStrategy)
passport.use('local-login', localLoginStrategy)

// pass the authentication checker middleware
const authCheckMiddleware = require('./middleware/auth-check')
app.use('/api', authCheckMiddleware)

// routes
const authRoutes = require('./routes/auth')
const apiRoutes = require('./routes/api')
app.use('/auth', authRoutes)
app.use('/api', apiRoutes)

// all remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
