import mongoose from 'mongoose'
import { logger } from '../utils/logger'

export const connectDB = async (retries = 5): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/realty-connect'
    
    console.log(`Attempting to connect to MongoDB... (${6 - retries}/5)`)
    console.log('MongoDB URI (masked):', mongoUri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'))
    
    await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000, // 30초로 증가
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000, // 연결 타임아웃 추가
      retryWrites: true,
      w: 'majority',
      readPreference: 'primary', // Primary 노드 선호
      authSource: 'admin', // 인증 소스 명시
    })
    
    console.log('MongoDB connected successfully')
    logger.info('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    logger.error('MongoDB connection error:', error)
    
    if (retries > 0) {
      console.log(`Retrying connection in 5 seconds... (${retries} attempts left)`)
      await new Promise(resolve => setTimeout(resolve, 5000))
      return connectDB(retries - 1)
    }
    
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