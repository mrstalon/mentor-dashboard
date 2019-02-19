const express = require('express')
const passport = require('passport')

const router = express.Router();

router.get('/github', passport.authenticate('github'))

router.get('/callback',
  passport.authenticate('github'),
  (req, res) => {
    res.redirect('/')
  })

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

module.exports = router