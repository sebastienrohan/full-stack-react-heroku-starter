const express = require('express')
const path = require('path')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')))

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
    jwksUri: process.env.jwksUri
  }),
  // This is the identifier we set when we created the API
  audience: 'http://mtgpoly.trade',
  issuer: process.env.issuer,
  algorithms: ['RS256']
})

// Answer API requests.
app.get('/api/users', function (req, res) {
  let users = [
    {
      'name': 'Seb',
      'have': 'Black Lotus',
      'want': 'Mox Jet'
    }
  ]
  res.json(users)
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'))
})

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`)
})
