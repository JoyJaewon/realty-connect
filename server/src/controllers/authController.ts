import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, IUser } from '../models/User'
import { logger } from '../utils/logger'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

interface JwtPayload {
  id: string
}

const generateTokens = (userId: string) => {
  const token = (jwt as any).sign(
    { id: userId }, 
    process.env.JWT_SECRET!,
    { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
  ) as string
  
  const refreshToken = (jwt as any).sign(
    { id: userId }, 
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
  ) as string
  
  return { token, refreshToken }
}

export const register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, username } = req.body

  // 이미 존재하는 사용자 확인
  const existingUser = await User.findOne({
    $or: [{ email }, { username }]
  })

  if (existingUser) {
    res.status(400).json({
      success: false,
      message: '이미 존재하는 이메일 또는 사용자명입니다.',
    })
    return
  }

  // 새 사용자 생성
  const user = await User.create({
    email,
    password,
    firstName,
    lastName,
    username,
  }) as IUser

  const { token, refreshToken } = generateTokens((user._id as any).toString())

  // 리프레시 토큰 저장
  user.refreshToken = refreshToken
  await user.save()

  logger.info(`New user registered: ${user.email}`)

  res.status(201).json({
    success: true,
    message: '회원가입이 완료되었습니다.',
    data: {
      user,
      token,
      refreshToken,
    },
  })
})

export const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body

  // 사용자 찾기 (비밀번호 포함)
  const user = await User.findOne({ email }).select('+password') as IUser

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({
      success: false,
      message: '이메일 또는 비밀번호가 올바르지 않습니다.',
    })
    return
  }

  const { token, refreshToken } = generateTokens((user._id as any).toString())

  // 리프레시 토큰 저장
  user.refreshToken = refreshToken
  await user.save()

  logger.info(`User logged in: ${user.email}`)

  res.json({
    success: true,
    message: '로그인이 완료되었습니다.',
    data: {
      user,
      token,
      refreshToken,
    },
  })
})

export const refreshToken = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    res.status(401).json({
      success: false,
      message: '리프레시 토큰이 필요합니다.',
    })
    return
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!) as JwtPayload
    const user = await User.findById(decoded.id) as IUser

    if (!user || user.refreshToken !== refreshToken) {
      res.status(401).json({
        success: false,
        message: '유효하지 않은 리프레시 토큰입니다.',
      })
      return
    }

    const { token, refreshToken: newRefreshToken } = generateTokens((user._id as any).toString())

    // 새 리프레시 토큰 저장
    user.refreshToken = newRefreshToken
    await user.save()

    res.json({
      success: true,
      data: {
        token,
        refreshToken: newRefreshToken,
      },
    })
  } catch (error) {
    res.status(401).json({
      success: false,
      message: '유효하지 않은 리프레시 토큰입니다.',
    })
  }
})

export const logout = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!._id)
  
  if (user) {
    user.refreshToken = ''
    await user.save()
  }

  res.json({
    success: true,
    message: '로그아웃이 완료되었습니다.',
  })
})

export const getMe = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user!._id)
    .populate('followers', 'firstName lastName username avatar')
    .populate('following', 'firstName lastName username avatar')

  res.json({
    success: true,
    data: { user },
  })
}) 