import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/realty-connect'
    
    console.log('Attempting to connect to MongoDB...')
    console.log('MongoDB URI (masked):', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'))
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    
    console.log('MongoDB connected successfully')
    logger.info('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    logger.error('MongoDB connection error:', error)
    process.exit(1)
  }
}

export const disconnectDB = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    logger.info('MongoDB disconnected successfully')
  } catch (error) {
    logger.error('MongoDB disconnection error:', error)
  }
}

mongoose.connection.on('error', (error) => {
  logger.error('MongoDB connection error:', error)
})

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected')
}) 