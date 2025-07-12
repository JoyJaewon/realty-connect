import { Request, Response, NextFunction } from 'express'
import { logger } from '@/utils/logger'

export interface CustomError extends Error {
  statusCode?: number
  isOperational?: boolean
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let { statusCode = 500, message } = err

  // Mongoose 에러 처리
  if (err.name === 'ValidationError') {
    statusCode = 400
    message = Object.values((err as any).errors).map((val: any) => val.message).join(', ')
  }

  if (err.name === 'CastError') {
    statusCode = 400
    message = '잘못된 ID 형식입니다.'
  }

  if ((err as any).code === 11000) {
    statusCode = 400
    const field = Object.keys((err as any).keyValue)[0]
    message = `${field} 필드가 이미 존재합니다.`
  }

  // JWT 에러 처리
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = '잘못된 토큰입니다.'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = '토큰이 만료되었습니다.'
  }

  // 로그 기록
  logger.error({
    message: err.message,
    stack: err.stack,
    statusCode,
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  })

  // 개발 환경에서는 스택 트레이스 포함
  const response: any = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  }

  res.status(statusCode).json(response)
}

export const notFound = (req: Request, _res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`) as CustomError
  error.statusCode = 404
  next(error)
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next)
} 