# RealtyConnect 🏠

한국어와 영어를 지원하는 부동산 투자 커뮤니티 플랫폼입니다.

## 🚀 주요 기능

### 🏘️ 커뮤니티 중심 기능
- **프로필 & 포트폴리오**: 투자 현황, 자산 구성, 목표 시각화
- **지역별 소그룹**: LA, DFW 등 지역별 투자자 그룹
- **실시간 피드**: SNS 스타일 투자일지, 질문, 경험 공유
- **멘토링/파트너 찾기**: 자본 파트너, 공동 투자자, 멘토 연결

### 📊 지식 & 도구 제공
- **실전 가이드**: DSCR 융자, 임차인 퇴거 절차, 1031 교환 등
- **투자 계산기**: BRRRR, Flipping, 임대 수익 계산
- **PDF & 템플릿**: 계약서, 융자 서류, 견적서 예시
- **지역 분석 도구**: Zillow/Google Maps API 연동

### 🎓 콘텐츠 & 교육
- **웹세미나/줌 클래스**: 일정 관리 및 신청
- **성공 사례**: 투자자 인터뷰, 실패 사례 포함
- **AI Q&A**: ChatGPT 기반 부동산 질문 답변
- **단계별 코스**: 초보자 30일 코스, 퀴즈 포함

### 🤝 네트워킹 & 협업
- **로컬 투자자 지도**: 지역별 활동 투자자 현황
- **협업 프로젝트**: 개발 기획자, 공동구매 희망자 매칭
- **오프라인 행사**: RSVP, 후기, 사진 공유

## 🛠️ 기술 스택

### Frontend
- **Next.js 14** - React 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 기반 스타일링
- **next-i18next** - 다국어 지원 (한국어/영어)
- **Zustand** - 상태 관리
- **Socket.io Client** - 실시간 통신

### Backend
- **Node.js + Express** - 서버 프레임워크
- **TypeScript** - 타입 안정성
- **MongoDB + Mongoose** - 데이터베이스
- **Socket.io** - 실시간 통신
- **JWT** - 인증
- **Cloudinary** - 이미지/파일 업로드

### DevOps & Tools
- **Vercel** - 프론트엔드 배포
- **Railway/Render** - 백엔드 배포
- **MongoDB Atlas** - 데이터베이스 호스팅

## 📁 프로젝트 구조

```
realty-connect/
├── client/          # Next.js 프론트엔드
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── store/
│   │   └── styles/
│   └── public/
├── server/          # Express.js 백엔드
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   └── dist/
├── shared/          # 공유 타입 & 유틸리티
│   ├── src/
│   │   └── types/
│   └── dist/
└── package.json     # Monorepo 루트
```

## 🚀 시작하기

### 필수 요구사항
- Node.js 18+ 
- MongoDB 6+
- npm 또는 yarn

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone https://github.com/your-username/realty-connect.git
   cd realty-connect
   ```

2. **의존성 설치**
   ```bash
   npm run install:all
   ```

3. **환경 변수 설정**
   ```bash
   cp .env.example .env
   # .env 파일을 편집하여 필요한 환경 변수 설정
   ```

4. **개발 서버 시작**
   ```bash
   npm run dev
   ```

   - 클라이언트: http://localhost:3000
   - 서버: http://localhost:3001

### 개별 실행

```bash
# 클라이언트만 실행
npm run dev:client

# 서버만 실행
npm run dev:server

# 빌드
npm run build

# 프로덕션 시작
npm start
```

## 🌐 환경 변수

주요 환경 변수들을 `.env` 파일에 설정하세요:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/realty-connect

# JWT
JWT_SECRET=your-super-secret-jwt-key-here

# External APIs
OPENAI_API_KEY=your-openai-api-key
ZILLOW_API_KEY=your-zillow-api-key
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# File Upload
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🤝 기여하기

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의

프로젝트 관련 문의사항이 있으시면 언제든지 연락주세요!

- 이메일: your-email@example.com
- 프로젝트 링크: https://github.com/your-username/realty-connect 