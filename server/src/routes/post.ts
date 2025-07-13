import { Router } from 'express'
import { body } from 'express-validator'
import { createPost, getPosts, getPost, updatePost, deletePost, likePost, unlikePost } from '../controllers/postController'
import { auth } from '../middleware/auth'
import { validate } from '../middleware/validate'

const router = Router()

// 게시물 생성
router.post('/', [
  auth,
  body('content').notEmpty().withMessage('내용을 입력해주세요.'),
  validate,
], createPost)

// 게시물 목록 조회
router.get('/', getPosts)

// 특정 게시물 조회
router.get('/:postId', getPost)

// 게시물 수정
router.put('/:postId', [
  auth,
  body('content').notEmpty().withMessage('내용을 입력해주세요.'),
  validate,
], updatePost)

// 게시물 삭제
router.delete('/:postId', auth, deletePost)

// 좋아요
router.post('/:postId/like', auth, likePost)

// 좋아요 취소
router.delete('/:postId/like', auth, unlikePost)

export default router 