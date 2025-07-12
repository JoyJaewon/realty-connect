import express from 'express'
import { body } from 'express-validator'
import { getUserProfile, updateProfile, getUserPosts, followUser, unfollowUser } from '@/controllers/userController'
import { auth } from '@/middleware/auth'
import { validate } from '@/middleware/validate'

const router = express.Router()

// 사용자 프로필 조회
router.get('/:userId', getUserProfile)

// 프로필 업데이트
router.put('/profile', [
  auth,
  body('firstName').optional().notEmpty().withMessage('이름을 입력해주세요.'),
  body('lastName').optional().notEmpty().withMessage('성을 입력해주세요.'),
  body('bio').optional().isLength({ max: 500 }).withMessage('자기소개는 500자 이내로 입력해주세요.'),
  body('location').optional().notEmpty().withMessage('지역을 입력해주세요.'),
  validate,
], updateProfile)

// 사용자 게시물 조회
router.get('/:userId/posts', getUserPosts)

// 팔로우
router.post('/:userId/follow', auth, followUser)

// 언팔로우
router.delete('/:userId/follow', auth, unfollowUser)

export default router 