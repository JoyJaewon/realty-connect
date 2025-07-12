import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import {
    Users,
    Calculator,
    GraduationCap,
    Network,
    Search,
    Heart,
    MessageCircle,
    Share2,
    MapPin,
    Calendar,
    Download,
    Play,
    Lock,
    CheckCircle,
    Clock,
    Star,
    TrendingUp,
    BookOpen,
    Video,
    UserPlus
} from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface TabProps {
    active: boolean
    onClick: () => void
    icon: React.ReactNode
    label: string
}

const Tab: React.FC<TabProps> = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${active
            ? 'bg-primary-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
    >
        {icon}
        <span className="font-medium">{label}</span>
    </button>
)

export const RealtyConnectPlatform: React.FC = () => {
    const { t } = useTranslation('common')
    const [activeTab, setActiveTab] = useState('community')

    const tabs = [
        { id: 'community', icon: <Users size={20} />, label: t('navigation.community') },
        { id: 'tools', icon: <Calculator size={20} />, label: t('navigation.tools') },
        { id: 'education', icon: <GraduationCap size={20} />, label: t('navigation.education') },
        { id: 'network', icon: <Network size={20} />, label: t('navigation.network') },
    ]

    const renderCommunityTab = () => (
        <div className="space-y-6">
            {/* 프로필 섹션 */}
            <div className="card p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-primary-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">김투자</h2>
                        <p className="text-gray-600">LA 지역 · 부동산 투자 3년차</p>
                    </div>
                    <Button variant="outline" className="ml-auto">
                        {t('buttons.edit_profile')}
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">$850K</div>
                        <div className="text-sm text-gray-600">{t('profile.total_assets')}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">3</div>
                        <div className="text-sm text-gray-600">{t('profile.properties')}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">$4.2K</div>
                        <div className="text-sm text-gray-600">{t('profile.monthly_income')}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary-600">LA</div>
                        <div className="text-sm text-gray-600">{t('profile.location')}</div>
                    </div>
                </div>
            </div>

            {/* 지역 그룹 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('community.local_groups')}</h3>
                <div className="space-y-3">
                    {[
                        { name: 'LA 부동산 투자자 모임', members: 1247, location: 'Los Angeles' },
                        { name: 'DFW 한인 투자자 그룹', members: 892, location: 'Dallas' },
                        { name: 'Orange County 투자 클럽', members: 634, location: 'Orange County' },
                    ].map((group, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                                <div className="font-medium">{group.name}</div>
                                <div className="text-sm text-gray-600">
                                    <MapPin className="inline w-4 h-4 mr-1" />
                                    {group.location} · {group.members} {t('community.members')}
                                </div>
                            </div>
                            <Button size="sm">가입</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 피드 */}
            <div className="card p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <input
                        type="text"
                        placeholder={t('placeholders.post_content')}
                        className="flex-1 input-field"
                    />
                    <Button>{t('buttons.post')}</Button>
                </div>

                <div className="space-y-4">
                    {[
                        {
                            author: '이멘토',
                            time: '2시간 전',
                            content: 'DSCR 융자로 첫 투자 성공! 다운페이먼트 25%로 듀플렉스 구매했습니다. 월 캐시플로우 $800 나오네요 👍',
                            likes: 24,
                            comments: 8,
                        },
                        {
                            author: '박초보',
                            time: '4시간 전',
                            content: '1031 교환 진행 중인데 궁금한 점이 있어요. 45일 안에 대상 물건을 정해야 하는데 어떤 기준으로 선택하시나요?',
                            likes: 12,
                            comments: 15,
                        },
                    ].map((post, index) => (
                        <div key={index} className="border-b pb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                <div>
                                    <div className="font-medium">{post.author}</div>
                                    <div className="text-sm text-gray-600">{post.time}</div>
                                </div>
                            </div>
                            <p className="mb-3">{post.content}</p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                                    <Heart size={16} />
                                    <span>{post.likes}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                                    <MessageCircle size={16} />
                                    <span>{post.comments}</span>
                                </button>
                                <button className="flex items-center gap-1 text-gray-600 hover:text-primary-600">
                                    <Share2 size={16} />
                                    <span>{t('buttons.share')}</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderToolsTab = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    {
                        title: t('tools.brrrr_calculator'),
                        description: t('tools.brrrr_description'),
                        icon: <Calculator className="w-6 h-6" />,
                        color: 'bg-blue-500',
                    },
                    {
                        title: t('tools.1031_exchange'),
                        description: t('tools.1031_description'),
                        icon: <BookOpen className="w-6 h-6" />,
                        color: 'bg-green-500',
                    },
                    {
                        title: t('tools.area_analysis'),
                        description: t('tools.area_description'),
                        icon: <TrendingUp className="w-6 h-6" />,
                        color: 'bg-purple-500',
                    },
                    {
                        title: t('tools.dscr_calculator'),
                        description: t('tools.dscr_description'),
                        icon: <Calculator className="w-6 h-6" />,
                        color: 'bg-orange-500',
                    },
                ].map((tool, index) => (
                    <div key={index} className="card p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-white`}>
                                {tool.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{tool.title}</h3>
                                <p className="text-gray-600 mb-4">{tool.description}</p>
                                <Button size="sm">사용하기</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

    const renderEducationTab = () => (
        <div className="space-y-6">
            {/* 이번 주 웹세미나 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('webinars.this_week')}</h3>
                <div className="space-y-4">
                    {[
                        {
                            title: t('webinars.dscr_mastery'),
                            date: '2024년 1월 15일 오후 8시',
                            speaker: '김전문가',
                            registered: 234,
                        },
                        {
                            title: t('webinars.1031_practical'),
                            date: '2024년 1월 17일 오후 7시',
                            speaker: '이멘토',
                            registered: 187,
                        },
                    ].map((webinar, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <h4 className="font-medium">{webinar.title}</h4>
                                <p className="text-sm text-gray-600">
                                    <Calendar className="inline w-4 h-4 mr-1" />
                                    {webinar.date} · {webinar.speaker}
                                </p>
                                <p className="text-sm text-gray-600">{webinar.registered}명 신청</p>
                            </div>
                            <Button size="sm">{t('buttons.register')}</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 초보자 코스 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('education.beginner_course')}</h3>
                <div className="space-y-3">
                    {[
                        { title: t('education.real_estate_basics'), duration: '45분', status: 'completed' },
                        { title: t('education.loan_types'), duration: '60분', status: 'in_progress' },
                        { title: t('education.property_analysis'), duration: '75분', status: 'locked' },
                    ].map((course, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    {course.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                                    {course.status === 'in_progress' && <Play className="w-5 h-5 text-primary-600" />}
                                    {course.status === 'locked' && <Lock className="w-5 h-5 text-gray-400" />}
                                </div>
                                <div>
                                    <h4 className="font-medium">{course.title}</h4>
                                    <p className="text-sm text-gray-600">{course.duration}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-600">
                                {course.status === 'completed' && t('education.completed')}
                                {course.status === 'in_progress' && t('education.in_progress')}
                                {course.status === 'locked' && t('education.locked')}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderNetworkTab = () => (
        <div className="space-y-6">
            {/* 파트너 찾기 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('network.find_partners')}</h3>
                <div className="space-y-4">
                    {[
                        {
                            title: t('network.capital_partner'),
                            author: '김투자',
                            location: 'LA',
                            details: '플리핑 프로젝트 공동 투자자 모집. 경험 3년, 성공 사례 5건',
                        },
                        {
                            title: t('network.co_investor'),
                            author: '이개발',
                            location: 'DFW',
                            details: '신축 듀플렉스 개발 프로젝트. 총 투자금 $500K, 50% 파트너 구함',
                        },
                    ].map((post, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-start justify-between mb-2">
                                <h4 className="font-medium">{post.title}</h4>
                                <span className="text-sm text-gray-600">{post.location}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">by {post.author}</p>
                            <p className="text-sm mb-3">{post.details}</p>
                            <Button size="sm">연락하기</Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 멘토 찾기 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('mentors.find_mentor')}</h3>
                <div className="space-y-4">
                    {[
                        {
                            name: '박멘토',
                            specialty: t('mentors.commercial_re'),
                            experience: '15년 경험',
                            deals: '50+ deals',
                            rating: 4.9,
                        },
                        {
                            name: '최전문가',
                            specialty: 'Fix & Flip',
                            experience: '8년 경험',
                            deals: '25+ deals',
                            rating: 4.8,
                        },
                    ].map((mentor, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                                <div>
                                    <h4 className="font-medium">{mentor.name}</h4>
                                    <p className="text-sm text-gray-600">{mentor.specialty}</p>
                                    <p className="text-sm text-gray-600">{mentor.experience} · {mentor.deals}</p>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                        <span className="text-sm">{mentor.rating}</span>
                                    </div>
                                </div>
                            </div>
                            <Button size="sm">
                                <UserPlus className="w-4 h-4 mr-2" />
                                멘토 신청
                            </Button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 오프라인 모임 */}
            <div className="card p-6">
                <h3 className="text-lg font-semibold mb-4">{t('network.offline_events')}</h3>
                <div className="space-y-4">
                    {[
                        {
                            title: t('network.regular_meetup'),
                            date: '2024년 1월 20일 오후 2시',
                            location: 'LA 한인타운',
                            attendees: 25,
                        },
                        {
                            title: t('network.networking_night'),
                            date: '2024년 1월 25일 오후 6시',
                            location: 'DFW 콜레이빌',
                            attendees: 18,
                        },
                    ].map((event, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium mb-2">{event.title}</h4>
                            <p className="text-sm text-gray-600 mb-1">
                                <Calendar className="inline w-4 h-4 mr-1" />
                                {event.date}
                            </p>
                            <p className="text-sm text-gray-600 mb-3">
                                <MapPin className="inline w-4 h-4 mr-1" />
                                {event.location} · {event.attendees}명 참석 예정
                            </p>
                            <Button size="sm">참석 신청</Button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

    const renderContent = () => {
        switch (activeTab) {
            case 'community':
                return renderCommunityTab()
            case 'tools':
                return renderToolsTab()
            case 'education':
                return renderEducationTab()
            case 'network':
                return renderNetworkTab()
            default:
                return renderCommunityTab()
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* 헤더 */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <h1 className="text-2xl font-bold text-primary-600">RealtyConnect</h1>

                            {/* 탭 네비게이션 */}
                            <nav className="flex gap-2">
                                {tabs.map((tab) => (
                                    <Tab
                                        key={tab.id}
                                        active={activeTab === tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        icon={tab.icon}
                                        label={tab.label}
                                    />
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder={t('placeholders.search')}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                />
                            </div>
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <Users className="w-4 h-4 text-primary-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 메인 콘텐츠 */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {renderContent()}
            </main>
        </div>
    )
} 