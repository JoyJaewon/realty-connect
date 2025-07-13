import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { User } from '../models/User'
import { Post } from '../models/Post'
import { connectDB } from '../config/database'

// 환경 변수 로드
dotenv.config()

const seedUsers = [
  {
    email: 'kim.investor@gmail.com',
    username: 'kim_investor',
    password: '123456',
    firstName: '김',
    lastName: '투자',
    avatar: '',
    bio: 'LA 지역 부동산 투자자입니다. 주로 단독주택과 듀플렉스에 투자하고 있습니다.',
    location: 'Los Angeles, CA',
    investmentGoals: ['cash-flow', 'appreciation'],
    totalAssets: 2400000,
    monthlyRentalIncome: 12800,
    propertyCount: 8,
  },
  {
    email: 'park.realestate@gmail.com',
    username: 'park_realestate',
    password: '123456',
    firstName: '박',
    lastName: '부동산',
    avatar: '',
    bio: 'DFW 지역 전문 투자자. DSCR 융자 전문가입니다.',
    location: 'Dallas, TX',
    investmentGoals: ['cash-flow', 'fix-flip'],
    totalAssets: 1800000,
    monthlyRentalIncome: 9500,
    propertyCount: 6,
  },
  {
    email: 'lee.method@gmail.com',
    username: 'lee_method',
    password: '123456',
    firstName: '이',
    lastName: '메토',
    avatar: '',
    bio: '5년차 투자자. 임차인 관리 전문가입니다.',
    location: 'Los Angeles, CA',
    investmentGoals: ['cash-flow'],
    totalAssets: 950000,
    monthlyRentalIncome: 4200,
    propertyCount: 3,
  },
  {
    email: 'choi.ceo@gmail.com',
    username: 'choi_ceo',
    password: '123456',
    firstName: '최',
    lastName: '사장',
    avatar: '',
    bio: '첫 투자 준비중입니다. 많은 조언 부탁드립니다!',
    location: 'Houston, TX',
    investmentGoals: ['cash-flow'],
    totalAssets: 200000,
    monthlyRentalIncome: 0,
    propertyCount: 0,
  },
  {
    email: 'kim.expert@gmail.com',
    username: 'kim_expert',
    password: '123456',
    firstName: '김',
    lastName: '전문가',
    avatar: '',
    bio: '상업용 부동산 전문가. 10년 경험.',
    location: 'Orange County, CA',
    investmentGoals: ['commercial', 'appreciation'],
    totalAssets: 5200000,
    monthlyRentalIncome: 25000,
    propertyCount: 12,
  },
  {
    email: 'park.experience@gmail.com',
    username: 'park_experience',
    password: '123456',
    firstName: '박',
    lastName: '경험자',
    avatar: '',
    bio: 'Fix & Flip 전문가. 50+ deals 경험.',
    location: 'Austin, TX',
    investmentGoals: ['fix-flip', 'appreciation'],
    totalAssets: 3100000,
    monthlyRentalIncome: 8500,
    propertyCount: 15,
  },
]

const seedPosts = [
  {
    content: '첫 DSCR 융자 승인받았네요! 🎉다운페이먼트 25%로 진행했고, 금리는 7.2%로 나왔습니다. 궁금한 점 있으시면 연락주세요.',
    propertyInfo: {
      address: '1234 Main St, Dallas, TX',
      purchasePrice: 285000,
      expectedRent: 2100,
      propertyType: 'single-family',
      city: 'Dallas',
      state: 'TX',
    },
    tags: ['dscr', 'financing', 'dallas'],
    location: 'DFW 지역',
    shares: 3,
  },
  {
    content: '임차인 스크리닝 할 때 꼭 확인해야 할 체크리스트 공유합니다. 5년간 경험한 노하우를 정리했어요.',
    attachments: [
      {
        type: 'pdf',
        url: '/documents/tenant-screening-checklist.pdf',
        name: '임차인 스크리닝 체크리스트.pdf',
      },
    ],
    tags: ['tenant-screening', 'property-management', 'guide'],
    location: 'LA 지역',
    shares: 8,
  },
  {
    content: '첫 투자 준비중인데 어떤 지역이 좋을까요? 예산은 $200k 정도이고 장기 렌탈 목적입니다.',
    poll: {
      question: '어떤 전략이 좋을까요?',
      options: [
        { text: 'Single Family House', votes: 45, voters: [] },
        { text: 'Duplex', votes: 35, voters: [] },
        { text: 'Condo', votes: 20, voters: [] },
      ],
    },
    tags: ['beginner', 'investment-strategy', 'houston'],
    location: 'Houston 지역',
    shares: 2,
  },
  {
    content: '1031 교환 성공 후기입니다! 세금 이연 효과가 생각보다 컸네요. 절차가 복잡하지만 충분히 가치있었습니다.',
    tags: ['1031-exchange', 'tax-strategy', 'success-story'],
    location: 'Orange County',
    shares: 12,
  },
  {
    content: 'Fix & Flip 프로젝트 완료! 3개월 만에 $45k 수익을 올렸습니다. 전후 사진과 수익 분석 공유합니다.',
    images: ['/images/before-after-1.jpg', '/images/before-after-2.jpg'],
    propertyInfo: {
      address: '5678 Oak Ave, Austin, TX',
      purchasePrice: 180000,
      expectedRent: 0,
      propertyType: 'single-family',
      city: 'Austin',
      state: 'TX',
    },
    tags: ['fix-flip', 'renovation', 'profit', 'austin'],
    location: 'Austin 지역',
    shares: 15,
  },
  {
    content: '상업용 부동산 첫 투자 고려중입니다. 주의사항이나 팁 있으시면 공유해주세요!',
    tags: ['commercial', 'beginner', 'advice'],
    location: 'LA 지역',
    shares: 1,
  },
]

export const seedDatabase = async () => {
  try {
    console.log('데이터베이스 연결 중...')
    await connectDB()

    console.log('기존 데이터 삭제 중...')
    await User.deleteMany({})
    await Post.deleteMany({})

    console.log('사용자 데이터 생성 중...')
    const createdUsers = await User.create(seedUsers)
    console.log(`${createdUsers.length}명의 사용자가 생성되었습니다.`)

    console.log('게시물 데이터 생성 중...')
    const postsWithAuthors = seedPosts.map((post, index) => ({
      ...post,
      author: createdUsers[index % createdUsers.length]._id,
      likes: [
        createdUsers[(index + 1) % createdUsers.length]._id,
        createdUsers[(index + 2) % createdUsers.length]._id,
      ],
    }))

    const createdPosts = await Post.create(postsWithAuthors)
    console.log(`${createdPosts.length}개의 게시물이 생성되었습니다.`)

    // 사용자 간 팔로우 관계 설정
    console.log('팔로우 관계 설정 중...')
    for (let i = 0; i < createdUsers.length; i++) {
      const user = createdUsers[i]
      const followingIndices = [
        (i + 1) % createdUsers.length,
        (i + 2) % createdUsers.length,
      ]
      
      user.following = followingIndices.map(idx => createdUsers[idx]._id as mongoose.Types.ObjectId)
      await user.save()

      // 팔로워 추가
      for (const idx of followingIndices) {
        const followedUser = createdUsers[idx]
        followedUser.followers.push(user._id as mongoose.Types.ObjectId)
        await followedUser.save()
      }
    }

    console.log('✅ 목 데이터 생성이 완료되었습니다!')
    console.log(`- 사용자: ${createdUsers.length}명`)
    console.log(`- 게시물: ${createdPosts.length}개`)
    
    process.exit(0)
  } catch (error) {
    console.error('❌ 목 데이터 생성 중 오류 발생:', error)
    process.exit(1)
  }
}

// 직접 실행 시
if (require.main === module) {
  seedDatabase()
} 