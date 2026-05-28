const express = require('express')

const http = require('http')

const socketio = require('socket.io')

const cors = require('cors')

const helmet = require('helmet')

const morgan = require('morgan')

const rateLimit = require('express-rate-limit')

const dotenv = require('dotenv')

const connectDB = require('./config/db')

dotenv.config()

/* ---------------- DATABASE ---------------- */

connectDB()

/* ---------------- APP ---------------- */

const app = express()

const server = http.createServer(app)

/* ---------------- SOCKET.IO ---------------- */

const io = socketio(server, {
  cors: {
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:5173',

    methods: ['GET', 'POST']
  }
})

/* ---------------- MIDDLEWARE ---------------- */

app.use(express.json())

app.use(
  cors({
    origin:
      process.env.CLIENT_URL ||
      'http://localhost:5173',

    credentials: true
  })
)

app.use(helmet())

app.use(morgan('dev'))

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
)

/* ---------------- ROUTES ---------------- */

app.use(
  '/api/auth',
  require('./routes/authRoutes')
)

app.use(
  '/api/gigs',
  require('./routes/gigRoutes')
)

app.use(
  '/api/proposals',
  require('./routes/proposalRoutes')
)


app.use(
  '/api/profile',
  require('./routes/profileRoutes')
)

app.use(
  '/api/reviews',
  require('./routes/reviewRoutes')
)
app.use(
  '/api/notifications',
  require('./routes/notificationRoutes')
)
app.use(
  '/api/admin',
  require('./routes/adminRoutes')
)
/* ---------------- HOME ROUTE ---------------- */

app.get('/', (req, res) => {
  res.send(
    'SkillSphere API Running'
  )
})

/* ---------------- SOCKET CONNECTION ---------------- */

io.on('connection', socket => {
  console.log('User Connected')

  /* RECEIVE MESSAGE */

  socket.on(
    'sendMessage',
    message => {
      console.log(
        'Message:',
        message
      )

      io.emit(
        'receiveMessage',
        message
      )
    }
  )

  /* TYPING INDICATOR */

  socket.on('typing', user => {
    socket.broadcast.emit(
      'typing',
      user
    )
  })

  /* DISCONNECT */

  socket.on('disconnect', () => {
    console.log(
      'User Disconnected'
    )
  })
})

/* ---------------- ERROR HANDLER ---------------- */

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.log(err)

    res.status(500).json({
      message:
        'Server Error'
    })
  }
)

/* ---------------- SERVER ---------------- */

const PORT =
  process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(
    `Server Running On ${PORT}`
  )
})