import { Request, Response } from 'express'
import { asyncHandler } from '@/middleware/errorHandler'
import { AuthRequest } from '@/middleware/auth'

// TODO: Post 모델이 생성되면 실제 구현
export const createPost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { content, images, tags, location } = (req as any).body

  // 임시 응답
  res.status(201).json({
    success: true,
    message: '게시물이 생성되었습니다.',
    data: {
      post: {
        id: 'temp-id',
        content,
        images: images || [],
        tags: tags || [],
        location,
        authorId: req.user!._id,
        createdAt: new Date(),
      },
    },
  })
})

export const getPosts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10

  // 임시 응답
  res.json({
    success: true,
    data: {
      posts: [],
      pagination: {
        page,
        limit,
        total: 0,
        pages: 0,
      },
    },
  })
})

export const getPost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId: _postId } = (req as any).params

  // 임시 응답
  res.json({
    success: true,
    data: {
      post: null,
    },
  })
})

export const updatePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId: _postId } = (req as any).params
  const { content, images, tags, location } = (req as any).body

  // 임시 응답
  res.json({
    success: true,
    message: '게시물이 수정되었습니다.',
    data: {
      post: {
        id: _postId,
        content,
        images: images || [],
        tags: tags || [],
        location,
        updatedAt: new Date(),
      },
    },
  })
})

export const deletePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId: _postId } = (req as any).params

  // 임시 응답
  res.json({
    success: true,
    message: '게시물이 삭제되었습니다.',
  })
})

export const likePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId: _postId } = (req as any).params

  // 임시 응답
  res.json({
    success: true,
    message: '좋아요가 추가되었습니다.',
  })
})

export const unlikePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId: _postId } = (req as any).params

  // 임시 응답
  res.json({
    success: true,
    message: '좋아요가 취소되었습니다.',
  })
}) 