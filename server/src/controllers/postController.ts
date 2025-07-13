import { Request, Response } from 'express'
import { Post } from '../models/Post'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

export const createPost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { content, images, attachments, propertyInfo, poll, tags, location, isPublic } = (req as any).body
  const authorId = req.user!._id

  const post = await Post.create({
    author: authorId,
    content,
    images,
    attachments,
    propertyInfo,
    poll,
    tags,
    location,
    isPublic: isPublic !== undefined ? isPublic : true,
  })

  const populatedPost = await Post.findById(post._id)
    .populate('author', 'firstName lastName username avatar location')
    .populate('likes', 'firstName lastName username')

  res.status(201).json({
    success: true,
    message: '게시물이 생성되었습니다.',
    data: { post: populatedPost },
  })
})

export const getPosts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10
  const skip = (page - 1) * limit

  // 필터링 옵션
  const { location, tags, author } = req.query
  const filter: any = { isPublic: true }

  if (location) {
    filter.location = { $regex: location, $options: 'i' }
  }

  if (tags) {
    const tagArray = typeof tags === 'string' ? tags.split(',') : tags
    filter.tags = { $in: tagArray }
  }

  if (author) {
    filter.author = author
  }

  const posts = await Post.find(filter)
    .populate('author', 'firstName lastName username avatar location')
    .populate('likes', 'firstName lastName username')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)

  const total = await Post.countDocuments(filter)

  res.json({
    success: true,
    data: {
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    },
  })
})

export const getPost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId } = (req as any).params

  const post = await Post.findById(postId)
    .populate('author', 'firstName lastName username avatar location')
    .populate('likes', 'firstName lastName username')

  if (!post) {
    res.status(404).json({
      success: false,
      message: '게시물을 찾을 수 없습니다.',
    })
    return
  }

  res.json({
    success: true,
    data: { post },
  })
})

export const updatePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId } = (req as any).params
  const { content, images, attachments, propertyInfo, poll, tags, location, isPublic } = (req as any).body
  const userId = req.user!._id

  const post = await Post.findById(postId)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '게시물을 찾을 수 없습니다.',
    })
    return
  }

  // 작성자 확인
  if (post.author.toString() !== userId.toString()) {
    res.status(403).json({
      success: false,
      message: '게시물을 수정할 권한이 없습니다.',
    })
    return
  }

  // 업데이트 가능한 필드들만 수정
  if (content !== undefined) post.content = content
  if (images !== undefined) post.images = images
  if (attachments !== undefined) post.attachments = attachments
  if (propertyInfo !== undefined) post.propertyInfo = propertyInfo
  if (poll !== undefined) post.poll = poll
  if (tags !== undefined) post.tags = tags
  if (location !== undefined) post.location = location
  if (isPublic !== undefined) post.isPublic = isPublic

  await post.save()

  const updatedPost = await Post.findById(post._id)
    .populate('author', 'firstName lastName username avatar location')
    .populate('likes', 'firstName lastName username')

  res.json({
    success: true,
    message: '게시물이 수정되었습니다.',
    data: { post: updatedPost },
  })
})

export const deletePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId } = (req as any).params
  const userId = req.user!._id

  const post = await Post.findById(postId)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '게시물을 찾을 수 없습니다.',
    })
    return
  }

  // 작성자 확인
  if (post.author.toString() !== userId.toString()) {
    res.status(403).json({
      success: false,
      message: '게시물을 삭제할 권한이 없습니다.',
    })
    return
  }

  await Post.findByIdAndDelete(postId)

  res.json({
    success: true,
    message: '게시물이 삭제되었습니다.',
  })
})

export const likePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId } = (req as any).params
  const userId = req.user!._id

  const post = await Post.findById(postId)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '게시물을 찾을 수 없습니다.',
    })
    return
  }

  // 이미 좋아요를 눌렀는지 확인
  if (post.likes.includes(userId as any)) {
    res.status(400).json({
      success: false,
      message: '이미 좋아요를 누른 게시물입니다.',
    })
    return
  }

  post.likes.push(userId as any)
  await post.save()

  res.json({
    success: true,
    message: '좋아요가 추가되었습니다.',
    data: { likesCount: post.likes.length },
  })
})

export const unlikePost = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { postId } = (req as any).params
  const userId = req.user!._id

  const post = await Post.findById(postId)

  if (!post) {
    res.status(404).json({
      success: false,
      message: '게시물을 찾을 수 없습니다.',
    })
    return
  }

  // 좋아요를 눌렀는지 확인
  if (!post.likes.includes(userId as any)) {
    res.status(400).json({
      success: false,
      message: '좋아요를 누르지 않은 게시물입니다.',
    })
    return
  }

  post.likes = post.likes.filter(id => id.toString() !== userId.toString())
  await post.save()

  res.json({
    success: true,
    message: '좋아요가 취소되었습니다.',
    data: { likesCount: post.likes.length },
  })
}) 