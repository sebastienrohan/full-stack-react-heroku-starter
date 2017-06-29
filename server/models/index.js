const mongoose = require('mongoose')

module.exports.connect = (uri) => {
  mongoose.connect(uri)
  // plug in the promise library:
  mongoose.Promise = global.Promise

  // connection events
  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`)
    process.exit(1)
  })

  mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + uri)
  })

  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
  })

  let gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
      console.log('Mongoose disconnected through ' + msg)
      callback()
    })
  }

// for nodemon restarts
  process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
      process.kill(process.pid, 'SIGUSR2')
    })
  })
// for app termination
  process.on('SIGINT', function () {
    gracefulShutdown('app termination', function () {
      process.exit(0)
    })
  })
// for Heroku app termination
  process.on('SIGTERM', function () {
    gracefulShutdown('Heroku app termination', function () {
      process.exit(0)
    })
  })

  // load models
  require('./user')
}
