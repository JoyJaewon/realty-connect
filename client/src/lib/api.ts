import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://realty-connect.onrender.com/api'

// 디버깅용 로그
console.log('API_BASE_URL:', API_BASE_URL)
console.log('NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL)

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터: 인증 토큰 추가
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터: 에러 처리
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 시 로그아웃 처리
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// API 타입 정의
export interface User {
  _id: string
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
  followers: string[]
  following: string[]
  isPaid: boolean
  paymentInfo?: {
    customerId?: string
    subscriptionId?: string
    planType?: 'basic' | 'premium' | 'enterprise'
    subscriptionStatus?: 'active' | 'canceled' | 'past_due' | 'incomplete'
    currentPeriodStart?: string
    currentPeriodEnd?: string
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
      paidAt?: string
      createdAt: string
    }[]
  }
  createdAt: string
  updatedAt: string
}

export interface Post {
  _id: string
  author: User
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
      voters: string[]
    }[]
  }
  likes: string[]
  comments: string[]
  shares: number
  tags: string[]
  location?: string
  isPublic: boolean
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  message?: string
  data?: T
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    posts?: T[]
    users?: T[]
    pagination: {
      page: number
      limit: number
      total: number
      pages: number
    }
  }
}

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  },

  register: async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    username: string
  }): Promise<ApiResponse<{ user: User; token: string }>> => {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  getMe: async (): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get('/auth/me')
    return response.data
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post('/auth/logout')
    return response.data
  },
}

// Posts API
export const postsApi = {
  getPosts: async (params?: {
    page?: number
    limit?: number
    location?: string
    tags?: string
    author?: string
  }): Promise<PaginatedResponse<Post>> => {
    const response = await api.get('/posts', { params })
    return response.data
  },

  getPost: async (postId: string): Promise<ApiResponse<{ post: Post }>> => {
    const response = await api.get(`/posts/${postId}`)
    return response.data
  },

  createPost: async (postData: {
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
      options: { text: string }[]
    }
    tags?: string[]
    location?: string
    isPublic?: boolean
  }): Promise<ApiResponse<{ post: Post }>> => {
    const response = await api.post('/posts', postData)
    return response.data
  },

  updatePost: async (postId: string, postData: Partial<{
    content: string
    images: string[]
    attachments: {
      type: 'pdf' | 'image' | 'document'
      url: string
      name: string
    }[]
    propertyInfo: {
      address: string
      purchasePrice: number
      expectedRent: number
      propertyType: 'single-family' | 'duplex' | 'multi-family' | 'condo' | 'commercial'
      city: string
      state: string
    }
    poll: {
      question: string
      options: { text: string }[]
    }
    tags: string[]
    location: string
    isPublic: boolean
  }>): Promise<ApiResponse<{ post: Post }>> => {
    const response = await api.put(`/posts/${postId}`, postData)
    return response.data
  },

  deletePost: async (postId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/posts/${postId}`)
    return response.data
  },

  likePost: async (postId: string): Promise<ApiResponse<{ likesCount: number }>> => {
    const response = await api.post(`/posts/${postId}/like`)
    return response.data
  },

  unlikePost: async (postId: string): Promise<ApiResponse<{ likesCount: number }>> => {
    const response = await api.post(`/posts/${postId}/unlike`)
    return response.data
  },
}

// Users API
export const usersApi = {
  getUser: async (userId: string): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.get(`/users/${userId}`)
    return response.data
  },

  updateUser: async (userId: string, userData: Partial<User>): Promise<ApiResponse<{ user: User }>> => {
    const response = await api.put(`/users/${userId}`, userData)
    return response.data
  },

  followUser: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await api.post(`/users/${userId}/follow`)
    return response.data
  },

  unfollowUser: async (userId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/users/${userId}/follow`)
    return response.data
  },

  getFollowers: async (userId: string): Promise<ApiResponse<{ users: User[] }>> => {
    const response = await api.get(`/users/${userId}/followers`)
    return response.data
  },

  getFollowing: async (userId: string): Promise<ApiResponse<{ users: User[] }>> => {
    const response = await api.get(`/users/${userId}/following`)
    return response.data
  },
}

// Payment API
export const paymentApi = {
  createSubscription: async (planType: 'basic' | 'premium' | 'enterprise'): Promise<ApiResponse<{ 
    subscriptionId: string
    clientSecret: string
  }>> => {
    const response = await api.post('/payment/subscription', { planType })
    return response.data
  },

  updateSubscription: async (subscriptionId: string, planType: 'basic' | 'premium' | 'enterprise'): Promise<ApiResponse<{ 
    subscription: any 
  }>> => {
    const response = await api.put(`/payment/subscription/${subscriptionId}`, { planType })
    return response.data
  },

  cancelSubscription: async (subscriptionId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/payment/subscription/${subscriptionId}`)
    return response.data
  },

  getPaymentMethods: async (): Promise<ApiResponse<{ paymentMethods: any[] }>> => {
    const response = await api.get('/payment/methods')
    return response.data
  },

  addPaymentMethod: async (paymentMethodId: string): Promise<ApiResponse<{ paymentMethod: any }>> => {
    const response = await api.post('/payment/methods', { paymentMethodId })
    return response.data
  },

  removePaymentMethod: async (paymentMethodId: string): Promise<ApiResponse<null>> => {
    const response = await api.delete(`/payment/methods/${paymentMethodId}`)
    return response.data
  },

  getBillingHistory: async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<any>> => {
    const response = await api.get('/payment/billing-history', { 
      params: { page, limit } 
    })
    return response.data
  },

  getInvoice: async (invoiceId: string): Promise<ApiResponse<{ invoice: any }>> => {
    const response = await api.get(`/payment/invoice/${invoiceId}`)
    return response.data
  },

  updatePaymentMethod: async (paymentMethodId: string): Promise<ApiResponse<{ paymentMethod: any }>> => {
    const response = await api.put('/payment/default-method', { paymentMethodId })
    return response.data
  },
} 