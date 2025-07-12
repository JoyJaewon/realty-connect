// User Types
export interface User {
  id: string
  email: string
  username: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  location?: string
  investmentGoals?: string[]
  totalAssets?: number
  monthlyRentalIncome?: number
  propertyCount?: number
  createdAt: Date
  updatedAt: Date
}

export interface UserProfile extends User {
  followers: number
  following: number
  posts: number
  groups: string[]
}

// Post Types
export interface Post {
  id: string
  authorId: string
  author: User
  content: string
  images?: string[]
  attachments?: Attachment[]
  likes: number
  comments: number
  shares: number
  tags?: string[]
  location?: string
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  author: User
  content: string
  likes: number
  replies?: Comment[]
  createdAt: Date
  updatedAt: Date
}

export interface Attachment {
  id: string
  type: 'pdf' | 'image' | 'document'
  name: string
  url: string
  size: number
}

// Community Types
export interface Community {
  id: string
  name: string
  description: string
  location: string
  memberCount: number
  isPrivate: boolean
  tags: string[]
  createdBy: string
  moderators: string[]
  createdAt: Date
  updatedAt: Date
}

export interface CommunityMember {
  userId: string
  communityId: string
  role: 'member' | 'moderator' | 'admin'
  joinedAt: Date
}

// Investment Types
export interface Property {
  id: string
  ownerId: string
  address: string
  city: string
  state: string
  zipCode: string
  propertyType: 'single-family' | 'multi-family' | 'condo' | 'townhouse' | 'commercial'
  purchasePrice: number
  currentValue?: number
  monthlyRent?: number
  expenses?: PropertyExpense[]
  purchaseDate: Date
  createdAt: Date
  updatedAt: Date
}

export interface PropertyExpense {
  id: string
  propertyId: string
  category: 'mortgage' | 'taxes' | 'insurance' | 'maintenance' | 'utilities' | 'other'
  amount: number
  description: string
  date: Date
}

// Calculator Types
export interface BRRRRCalculation {
  purchasePrice: number
  rehabCost: number
  afterRepairValue: number
  monthlyRent: number
  refinanceAmount: number
  monthlyExpenses: number
  results: {
    totalInvestment: number
    cashOnCash: number
    monthlyProfit: number
    annualProfit: number
  }
}

export interface DSCRCalculation {
  propertyValue: number
  downPayment: number
  interestRate: number
  loanTerm: number
  monthlyRent: number
  monthlyExpenses: number
  results: {
    loanAmount: number
    monthlyPayment: number
    dscr: number
    approved: boolean
  }
}

// Event Types
export interface Event {
  id: string
  title: string
  description: string
  type: 'webinar' | 'meetup' | 'workshop' | 'networking'
  date: Date
  location?: string
  isOnline: boolean
  maxAttendees?: number
  currentAttendees: number
  organizerId: string
  price?: number
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface EventRegistration {
  id: string
  eventId: string
  userId: string
  registeredAt: Date
  attended?: boolean
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

// Auth Types
export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  username: string
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
}

// Socket Event Types
export interface SocketEvents {
  'user:join': (data: { userId: string; roomId: string }) => void
  'user:leave': (data: { userId: string; roomId: string }) => void
  'post:new': (data: { post: Post; roomId: string }) => void
  'post:like': (data: { postId: string; userId: string; roomId: string }) => void
  'comment:new': (data: { comment: Comment; roomId: string }) => void
  'notification:new': (data: { userId: string; notification: Notification }) => void
}

export interface Notification {
  id: string
  userId: string
  type: 'like' | 'comment' | 'follow' | 'mention' | 'event'
  title: string
  message: string
  read: boolean
  data?: any
  createdAt: Date
} 