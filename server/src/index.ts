import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { createServer } from 'http'
import { Server } from 'socket.io'
import rateLimit from 'express-rate-limit'

import { connectDB } from './config/database'
import { logger } from './utils/logger'
import { errorHandler } from './middleware/errorHandler'

// Routes
import authRoutes from './routes/auth'
import userRoutes from './routes/user'
import postRoutes from './routes/post'
import communityRoutes from './routes/community'

// Load environment variables
dotenv.config()

// 환경 변수 확인 로깅
console.log('Environment variables check:')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('PORT:', process.env.PORT)
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET)
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN)

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}))
app.use(morgan('combined', { stream: { write: (message: any) => logger.info(message.trim()) } }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(limiter)

// Health check
app.get('/health', (_req: any, res: any) => {
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
app.use((_req: any, res: any) => {
  res.status(404).json({
    success: false,
    message: '요청한 리소스를 찾을 수 없습니다.',
  })
})

// Start server
const startServer = async () => {
  try {
    console.log('Starting server...')
    await connectDB()
    console.log('Database connected, starting HTTP server...')
    
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
      console.log(`🚀 Server successfully started on port ${PORT}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    logger.error('Failed to start server:', error)
    process.exit(1)
  }
}

console.log('Calling startServer...')
startServer().catch((error) => {
  console.error('Unhandled error in startServer:', error)
  process.exit(1)
})

export { io } 