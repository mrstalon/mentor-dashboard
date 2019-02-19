module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    if (req.originalUrl.split('/')[1] === 'api') {
      res.status(401).end()
    } else {
      next()
    }
  }
}