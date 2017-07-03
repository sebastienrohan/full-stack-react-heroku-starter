const express = require('express')
const User = require('mongoose').model('User')

const router = new express.Router()

router.get('/dashboard', (req, res) => {
  User.find({}).exec(
    (err, users) => {
      if (err) throw err
      res.status(200).json({
        'users': users
      })
    }
  )
})

module.exports = router
