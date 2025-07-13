import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/User'

export interface AuthRequest extends Request {
  user?: any
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = (req as any).header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({
        success: false,
        message: '액세스 토큰이 필요합니다.',
      })
      return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const user = await User.findById(decoded.id).select('-password')

    if (!user) {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 토큰입니다.',
      })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '유효하지 않은 토큰입니다.',
    })
  }
}

export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
  try {
    const token = (req as any).header('Authorization')?.replace('Bearer ', '')

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
      const user = await User.findById(decoded.id).select('-password')
      
      if (user) {
        req.user = user
      }
    }

    next()
  } catch (error) {
    // 선택적 인증에서는 에러를 무시하고 계속 진행
    next()
  }
} 