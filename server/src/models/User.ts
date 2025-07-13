import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  username: string
  password: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  location?: string
  investmentGoals?: string[]
  totalAssets?: number
  monthlyRentalIncome?: number
  propertyCount?: number
  followers: mongoose.Types.ObjectId[]
  following: mongoose.Types.ObjectId[]
  isPaid: boolean
  paymentInfo?: {
    customerId?: string
    subscriptionId?: string
    planType?: 'basic' | 'premium' | 'enterprise'
    subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'incomplete'
    currentPeriodStart?: Date
    currentPeriodEnd?: Date
    paymentMethod?: {
      type: 'card' | 'paypal' | 'bank_transfer'
      last4?: string
      brand?: string
    }
    billingHistory?: {
      invoiceId: string
      amount: number
      currency: string
      status: 'paid' | 'pending' | 'failed'
      paidAt?: Date
      createdAt: Date
    }[]
  }
  refreshToken?: string
  createdAt: Date
  updatedAt: Date
  comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: [true, '이메일은 필수입니다.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type: String,
    required: [true, '사용자명은 필수입니다.'],
    unique: true,
    trim: true,
    minlength: [3, '사용자명은 최소 3자 이상이어야 합니다.'],
  },
  password: {
    type: String,
    required: [true, '비밀번호는 필수입니다.'],
    minlength: [6, '비밀번호는 최소 6자 이상이어야 합니다.'],
  },
  firstName: {
    type: String,
    required: [true, '이름은 필수입니다.'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, '성은 필수입니다.'],
    trim: true,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    maxlength: [500, '자기소개는 500자 이내로 입력해주세요.'],
  },
  location: {
    type: String,
    trim: true,
  },
  investmentGoals: [{
    type: String,
    enum: ['cash-flow', 'appreciation', 'fix-flip', 'commercial', 'land'],
  }],
  totalAssets: {
    type: Number,
    default: 0,
  },
  monthlyRentalIncome: {
    type: Number,
    default: 0,
  },
  propertyCount: {
    type: Number,
    default: 0,
  },
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  isPaid: {
    type: Boolean,
    default: false,
  },
  paymentInfo: {
    customerId: {
      type: String,
      sparse: true,
    },
    subscriptionId: {
      type: String,
      sparse: true,
    },
    planType: {
      type: String,
      enum: ['basic', 'premium', 'enterprise'],
      default: 'basic',
    },
    subscriptionStatus: {
      type: String,
      enum: ['active', 'canceled', 'past_due', 'incomplete'],
      default: 'active',
    },
    currentPeriodStart: {
      type: Date,
    },
    currentPeriodEnd: {
      type: Date,
    },
    paymentMethod: {
      type: {
        type: String,
        enum: ['card', 'paypal', 'bank_transfer'],
      },
      last4: {
        type: String,
        maxlength: 4,
      },
      brand: {
        type: String,
      },
    },
    billingHistory: [{
      invoiceId: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: 'USD',
      },
      status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        required: true,
      },
      paidAt: {
        type: Date,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
  },
  refreshToken: {
    type: String,
  },
}, {
  timestamps: true,
})

// 비밀번호 해싱
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  
  const salt = await bcrypt.genSalt(12)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// 비밀번호 비교 메서드
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

// 민감한 정보 제거
userSchema.methods.toJSON = function () {
  const userObject = this.toObject()
  delete userObject.password
  delete userObject.refreshToken
  // 결제 정보의 민감한 부분만 제거 (customerId, subscriptionId 등은 유지)
  return userObject
}

// 인덱스 추가
userSchema.index({ 'paymentInfo.customerId': 1 })
userSchema.index({ 'paymentInfo.subscriptionId': 1 })
userSchema.index({ isPaid: 1 })

export const User = mongoose.model<IUser>('User', userSchema) 