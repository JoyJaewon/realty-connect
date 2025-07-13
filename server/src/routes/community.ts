import { Router } from 'express'
import { body } from 'express-validator'
import { getCommunities, getCommunity, createCommunity, joinCommunity, leaveCommunity } from '../controllers/communityController'
import { auth } from '../middleware/auth'
import { validate } from '../middleware/validate'

const router = Router()

// 커뮤니티 목록 조회
router.get('/', getCommunities)

// 특정 커뮤니티 조회
router.get('/:communityId', getCommunity)

// 커뮤니티 생성
router.post('/', [
  auth,
  body('name').notEmpty().withMessage('커뮤니티 이름을 입력해주세요.'),
  body('description').notEmpty().withMessage('커뮤니티 설명을 입력해주세요.'),
  body('location').notEmpty().withMessage('지역을 입력해주세요.'),
  validate,
], createCommunity)

// 커뮤니티 가입
router.post('/:communityId/join', auth, joinCommunity)

// 커뮤니티 탈퇴
router.delete('/:communityId/leave', auth, leaveCommunity)

export default router 