import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

export const validate = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg)
    res.status(400).json({
      success: false,
      message: '입력값이 유효하지 않습니다.',
      errors: errorMessages,
    })
    return
  }

  next()
} 