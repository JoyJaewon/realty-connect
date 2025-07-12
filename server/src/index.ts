import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import rateLimit from 'express-rate-limit'

import { connectDB } from '@/config/database'
import { logger } from '@/utils/logger'
import { errorHandler } from '@/middleware/errorHandler'

// Routes
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'
import postRoutes from '@/routes/post'
import communityRoutes from '@/routes/community'

// Load environment variables
dotenv.config()

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 3001

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

// Health check
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/community', communityRoutes)

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`)
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId)
    logger.info(`User ${socket.id} joined room ${roomId}`)
  })
  
  socket.on('leave-room', (roomId) => {
    socket.leave(roomId)
    logger.info(`User ${socket.id} left room ${roomId}`)
  })
  
  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`)
  })
})

// Error handling middleware
app.use(errorHandler)

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Start server
const startServer = async () => {
  try {
    await connectDB()
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()

export { io } 