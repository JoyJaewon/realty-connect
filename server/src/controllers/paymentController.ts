import { Response } from 'express'
import { User } from '../models/User'
import { asyncHandler } from '../middleware/errorHandler'
import { AuthRequest } from '../middleware/auth'

// 구독 생성
export const createSubscription = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { planType } = req.body
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Stripe 또는 다른 결제 서비스 연동
  // 임시로 목업 데이터 반환
  const mockSubscriptionId = `sub_${Date.now()}`
  const mockClientSecret = `pi_${Date.now()}_secret`

  // 사용자 결제 정보 업데이트
  user.isPaid = true
  user.paymentInfo = {
    ...user.paymentInfo,
    subscriptionId: mockSubscriptionId,
    planType,
    subscriptionStatus: 'active',
    currentPeriodStart: new Date(),
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30일 후
  }

  await user.save()

  res.status(201).json({
    success: true,
    message: '구독이 생성되었습니다.',
    data: {
      subscriptionId: mockSubscriptionId,
      clientSecret: mockClientSecret,
    },
  })
})

// 구독 업데이트
export const updateSubscription = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { subscriptionId } = req.params
  const { planType } = req.body
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  if (user.paymentInfo?.subscriptionId !== subscriptionId) {
    res.status(403).json({
      success: false,
      message: '구독 정보가 일치하지 않습니다.',
    })
    return
  }

  // TODO: Stripe 구독 업데이트
  user.paymentInfo.planType = planType
  await user.save()

  res.json({
    success: true,
    message: '구독이 업데이트되었습니다.',
    data: {
      subscription: user.paymentInfo,
    },
  })
})

// 구독 취소
export const cancelSubscription = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { subscriptionId } = req.params
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  if (user.paymentInfo?.subscriptionId !== subscriptionId) {
    res.status(403).json({
      success: false,
      message: '구독 정보가 일치하지 않습니다.',
    })
    return
  }

  // TODO: Stripe 구독 취소
  user.paymentInfo.subscriptionStatus = 'canceled'
  await user.save()

  res.json({
    success: true,
    message: '구독이 취소되었습니다.',
  })
})

// 결제 수단 목록 조회
export const getPaymentMethods = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Stripe에서 결제 수단 목록 조회
  const mockPaymentMethods = [
    {
      id: 'pm_1234',
      type: 'card',
      card: {
        brand: 'visa',
        last4: '4242',
        exp_month: 12,
        exp_year: 2025,
      },
      isDefault: true,
    },
  ]

  res.json({
    success: true,
    data: {
      paymentMethods: mockPaymentMethods,
    },
  })
})

// 결제 수단 추가
export const addPaymentMethod = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { paymentMethodId } = req.body
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Stripe에 결제 수단 추가
  const mockPaymentMethod = {
    id: paymentMethodId,
    type: 'card',
    card: {
      brand: 'visa',
      last4: '4242',
    },
  }

  res.json({
    success: true,
    message: '결제 수단이 추가되었습니다.',
    data: {
      paymentMethod: mockPaymentMethod,
    },
  })
})

// 결제 수단 제거
export const removePaymentMethod = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Stripe에서 결제 수단 제거
  res.json({
    success: true,
    message: '결제 수단이 제거되었습니다.',
  })
})

// 결제 내역 조회
export const getBillingHistory = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!._id
  const page = parseInt(req.query.page as string) || 1
  const limit = parseInt(req.query.limit as string) || 10

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  const billingHistory = user.paymentInfo?.billingHistory || []
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedHistory = billingHistory.slice(startIndex, endIndex)

  res.json({
    success: true,
    data: {
      billingHistory: paginatedHistory,
      pagination: {
        page,
        limit,
        total: billingHistory.length,
        pages: Math.ceil(billingHistory.length / limit),
      },
    },
  })
})

// 인보이스 조회
export const getInvoice = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { invoiceId } = req.params
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  const invoice = user.paymentInfo?.billingHistory?.find(
    (item) => item.invoiceId === invoiceId
  )

  if (!invoice) {
    res.status(404).json({
      success: false,
      message: '인보이스를 찾을 수 없습니다.',
    })
    return
  }

  res.json({
    success: true,
    data: {
      invoice,
    },
  })
})

// 기본 결제 수단 업데이트
export const updateDefaultPaymentMethod = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { paymentMethodId } = req.body
  const userId = req.user!._id

  const user = await User.findById(userId)
  if (!user) {
    res.status(404).json({
      success: false,
      message: '사용자를 찾을 수 없습니다.',
    })
    return
  }

  // TODO: Stripe에서 기본 결제 수단 업데이트
  res.json({
    success: true,
    message: '기본 결제 수단이 업데이트되었습니다.',
    data: {
      paymentMethod: {
        id: paymentMethodId,
        isDefault: true,
      },
    },
  })
}) 