import { Request, Response } from 'express'
import { User } from '@/models/User'
import { asyncHandler } from '@/middleware/errorHandler'
import { AuthRequest } from '@/middleware/auth'

export const getUserProfile = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params

  const user = await User.findById(userId)
    .populate('followers', 'firstName lastName username avatar')
    .populate('following', 'firstName lastName username avatar')

  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  res.json({
    success: true,
    data: { user },
  })
})

export const updateProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { firstName, lastName, bio, location, investmentGoals, totalAssets, monthlyRentalIncome, propertyCount } = req.body

  const user = await User.findById(req.user!._id)

  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // 업데이트 가능한 필드들만 수정
  if (firstName) user.firstName = firstName
  if (lastName) user.lastName = lastName
  if (bio !== undefined) user.bio = bio
  if (location) user.location = location
  if (investmentGoals) user.investmentGoals = investmentGoals
  if (totalAssets !== undefined) user.totalAssets = totalAssets
  if (monthlyRentalIncome !== undefined) user.monthlyRentalIncome = monthlyRentalIncome
  if (propertyCount !== undefined) user.propertyCount = propertyCount

  await user.save()

  res.json({
    success: true,
    message: '프로필이 업데이트되었습니다.',
    data: { user },
  })
})

export const getUserPosts = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10

  // 사용자 존재 확인
  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Post 모델이 생성되면 실제 게시물 조회 로직 구현
  const posts: any[] = []
  const total = 0

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

export const followUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId } = req.params
  const currentUserId = req.user!._id

  if (userId === currentUserId.toString()) {
    res.status(400).json({
      success: false,
      message: '자기 자신을 팔로우할 수 없습니다.',
    })
    return
  }

  const userToFollow = await User.findById(userId)
  const currentUser = await User.findById(currentUserId)

  if (!userToFollow || !currentUser) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // 이미 팔로우 중인지 확인
  if (currentUser.following.includes(userId as any)) {
    res.status(400).json({
      success: false,
      message: '이미 팔로우 중인 사용자입니다.',
    })
    return
  }

  // 팔로우 추가
  currentUser.following.push(userId as any)
  userToFollow.followers.push(currentUserId as any)

  await currentUser.save()
  await userToFollow.save()

  res.json({
    success: true,
    message: '팔로우가 완료되었습니다.',
  })
})

export const unfollowUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId } = req.params
  const currentUserId = req.user!._id

  const userToUnfollow = await User.findById(userId)
  const currentUser = await User.findById(currentUserId)

  if (!userToUnfollow || !currentUser) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // 팔로우 중인지 확인
  if (!currentUser.following.includes(userId as any)) {
    res.status(400).json({
      success: false,
      message: '팔로우 중이지 않은 사용자입니다.',
    })
    return
  }

  // 언팔로우
  currentUser.following = currentUser.following.filter(id => id.toString() !== userId)
  userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== currentUserId.toString())

  await currentUser.save()
  await userToUnfollow.save()

  res.json({
    success: true,
    message: '언팔로우가 완료되었습니다.',
  })
}) 