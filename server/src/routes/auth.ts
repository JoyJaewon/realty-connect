import express from 'express'
import { body } from 'express-validator'
import { register, login, refreshToken, logout, getMe } from '@/controllers/authController'
import { auth } from '@/middleware/auth'
import { validate } from '@/middleware/validate'

const router = express.Router()

// 회원가입
router.post('/register', [
  body('email').isEmail().withMessage('유효한 이메일을 입력해주세요.'),
  body('password').isLength({ min: 6 }).withMessage('비밀번호는 최소 6자 이상이어야 합니다.'),
  body('firstName').notEmpty().withMessage('이름을 입력해주세요.'),
  body('lastName').notEmpty().withMessage('성을 입력해주세요.'),
  body('username').isLength({ min: 3 }).withMessage('사용자명은 최소 3자 이상이어야 합니다.'),
  validate,
], register)

// 로그인
router.post('/login', [
  body('email').isEmail().withMessage('유효한 이메일을 입력해주세요.'),
  body('password').notEmpty().withMessage('비밀번호를 입력해주세요.'),
  validate,
], login)

// 토큰 갱신
router.post('/refresh', refreshToken)

// 로그아웃
router.post('/logout', auth, logout)

// 현재 사용자 정보
router.get('/me', auth, getMe)

export default router 