import mongoose, { Document, Schema } from 'mongoose'

export interface IPost extends Document {
  author: mongoose.Types.ObjectId
  content: string
  images?: string[]
  attachments?: {
    type: 'pdf' | 'image' | 'document'
    url: string
    name: string
  }[]
  propertyInfo?: {
    address: string
    purchasePrice: number
    expectedRent: number
    propertyType: 'single-family' | 'duplex' | 'multi-family' | 'condo' | 'commercial'
    city: string
    state: string
  }
  poll?: {
    question: string
    options: {
      text: string
      votes: number
      voters: mongoose.Types.ObjectId[]
    }[]
  }
  likes: mongoose.Types.ObjectId[]
  comments: mongoose.Types.ObjectId[]
  shares: number
  tags: string[]
  location?: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

const postSchema = new Schema<IPost>({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: [true, '내용을 입력해주세요.'],
    maxlength: [2000, '내용은 2000자 이내로 입력해주세요.'],
  },
  images: [{
    type: String,
  }],
  attachments: [{
    type: {
      type: String,
      enum: ['pdf', 'image', 'document'],
    },
    url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  }],
  propertyInfo: {
    address: String,
    purchasePrice: Number,
    expectedRent: Number,
    propertyType: {
      type: String,
      enum: ['single-family', 'duplex', 'multi-family', 'condo', 'commercial'],
    },
    city: String,
    state: String,
  },
  poll: {
    question: String,
    options: [{
      text: String,
      votes: {
        type: Number,
        default: 0,
      },
      voters: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
      }],
    }],
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
  }],
  shares: {
    type: Number,
    default: 0,
  },
  tags: [{
    type: String,
    lowercase: true,
  }],
  location: {
    type: String,
    trim: true,
  },
  isPublic: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
})

// 인덱스 설정
postSchema.index({ author: 1, createdAt: -1 })
postSchema.index({ tags: 1 })
postSchema.index({ location: 1 })
postSchema.index({ createdAt: -1 })

export const Post = mongoose.model<IPost>('Post', postSchema) 