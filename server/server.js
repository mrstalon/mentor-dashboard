const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const mentorsRoutes = require('./api/routes/mentors')
const authRoutes = require('./api/routes/auth')

const passport = require('./auth/passport-init');
const isAuthed = require('./auth/authorised-helper');

const PORT = process.env.PORT || 5000
const STATIC_PATH = path.join(__dirname, '../client-dist/static')
const VIEWS_PATH = path.join(__dirname, '../client-dist')


const app = express()

app.use(cors())
app.use('/static', express.static(STATIC_PATH))
app.engine('html', ejs.renderFile)

app.set('views', VIEWS_PATH)
app.set('view engine', 'html')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/json' }))
app.use(session({
  secret: 'session-secret',
  saveUninitialized: true,
  resave: true
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(isAuthed)

app.use('/auth', authRoutes)
app.use('/api/mentors', mentorsRoutes)
app.get('*', (req, res) => res.render('index'))

app.listen(PORT, () => console.log('Server is listening'))
  .on('error', (err) => console.log(err))