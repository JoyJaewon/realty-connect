import { Router } from 'express'
import { body } from 'express-validator'
import {
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getBillingHistory,
  getInvoice,
  updateDefaultPaymentMethod,
} from '../controllers/paymentController'
import { auth } from '../middleware/auth'
import { validate } from '../middleware/validate'

const router = Router()

// 구독 생성
router.post('/subscription', [
  auth,
  body('planType').isIn(['basic', 'premium', 'enterprise']).withMessage('유효한 플랜 타입을 선택해주세요.'),
  validate,
], createSubscription)

// 구독 업데이트
router.put('/subscription/:subscriptionId', [
  auth,
  body('planType').isIn(['basic', 'premium', 'enterprise']).withMessage('유효한 플랜 타입을 선택해주세요.'),
  validate,
], updateSubscription)

// 구독 취소
router.delete('/subscription/:subscriptionId', auth, cancelSubscription)

// 결제 수단 목록 조회
router.get('/methods', auth, getPaymentMethods)

// 결제 수단 추가
router.post('/methods', [
  auth,
  body('paymentMethodId').notEmpty().withMessage('결제 수단 ID를 입력해주세요.'),
  validate,
], addPaymentMethod)

// 결제 수단 제거
router.delete('/methods/:paymentMethodId', auth, removePaymentMethod)

// 결제 내역 조회
router.get('/billing-history', auth, getBillingHistory)

// 인보이스 조회
router.get('/invoice/:invoiceId', auth, getInvoice)

// 기본 결제 수단 업데이트
router.put('/default-method', [
  auth,
  body('paymentMethodId').notEmpty().withMessage('결제 수단 ID를 입력해주세요.'),
  validate,
], updateDefaultPaymentMethod)

export default router 