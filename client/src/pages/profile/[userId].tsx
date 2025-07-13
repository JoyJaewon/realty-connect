"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/Button"
import { MapPin, Calendar, Users, MessageCircle, Heart, Share2 } from "lucide-react"
import { postsApi, usersApi, Post, User } from "@/lib/api"
import Header from "../../components/layout/Header"
import Sidebar from "../../components/layout/Sidebar"
import PostCard from "../../components/feed/PostCard"

// Card 컴포넌트 (임시)
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <h3 className={`font-semibold text-gray-900 ${className}`}>{children}</h3>
)

// Avatar 컴포넌트 (임시)
const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
        {children}
    </div>
)

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
    <span className="text-2xl font-medium text-gray-700">{children}</span>
)

const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
)

// Badge 컴포넌트 (임시)
const Badge = ({
    children,
    variant = "default",
    className = ""
}: {
    children: React.ReactNode;
    variant?: "default" | "outline" | "secondary";
    className?: string
}) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    const variantClasses = {
        default: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-700",
        secondary: "bg-gray-100 text-gray-800"
    }

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    )
}

export default function ProfilePage() {
    const router = useRouter()
    const { userId } = router.query
    const [userProfile, setUserProfile] = useState<User | null>(null)
    const [userPosts, setUserPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
    }

    const formatJoinDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long'
        })
    }

    useEffect(() => {
        if (!userId) return

        const fetchUserProfile = async () => {
            try {
                setLoading(true)

                // 사용자 프로필 가져오기
                const profileResponse = await usersApi.getUser(userId as string)

                if (profileResponse.success && profileResponse.data?.user) {
                    setUserProfile(profileResponse.data.user)
                } else {
                    setError('사용자를 찾을 수 없습니다.')
                    return
                }

                // 사용자의 게시물 가져오기
                const postsResponse = await postsApi.getPosts({
                    page: 1,
                    limit: 20,
                    author: userId as string
                })

                if (postsResponse.success && postsResponse.data.posts) {
                    setUserPosts(postsResponse.data.posts)
                }
            } catch (err) {
                console.error('Failed to fetch user profile:', err)
                setError('사용자 프로필을 불러오는데 실패했습니다.')
            } finally {
                setLoading(false)
            }
        }

        fetchUserProfile()
    }, [userId])

    const handleLike = async (postId: string) => {
        // 좋아요 처리 로직
        console.log('Like post:', postId)
    }

    const handleUnlike = async (postId: string) => {
        // 좋아요 취소 처리 로직
        console.log('Unlike post:', postId)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header activeTab="community" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Sidebar - Desktop only */}
                        <div className="hidden lg:block lg:col-span-1">
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="col-span-1 lg:col-span-3">
                            <div className="text-center py-12">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                <p className="mt-4 text-gray-600">프로필을 불러오는 중...</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (error || !userProfile) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header activeTab="community" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Left Sidebar - Desktop only */}
                        <div className="hidden lg:block lg:col-span-1">
                            <Sidebar />
                        </div>

                        {/* Main Content */}
                        <div className="col-span-1 lg:col-span-3">
                            <div className="text-center py-12">
                                <p className="text-red-600">{error || '사용자를 찾을 수 없습니다.'}</p>
                                <div className="mt-4">
                                    <Button
                                        onClick={() => router.push('/community')}
                                    >
                                        커뮤니티로 돌아가기
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeTab="community" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Desktop only */}
                    <div className="hidden lg:block lg:col-span-1">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-3">
                        <div className="space-y-6">
                            {/* 프로필 헤더 */}
                            <Card>
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                                        <Avatar className="w-24 h-24 mx-auto md:mx-0">
                                            {userProfile.avatar ? (
                                                <AvatarImage src={userProfile.avatar} alt={userProfile.firstName} />
                                            ) : (
                                                <AvatarFallback>
                                                    {getInitials(userProfile.firstName, userProfile.lastName)}
                                                </AvatarFallback>
                                            )}
                                        </Avatar>

                                        <div className="flex-1 text-center md:text-left">
                                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                                {userProfile.firstName}{userProfile.lastName}
                                            </h1>

                                            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-4 text-gray-600">
                                                <div className="flex items-center">
                                                    <MapPin className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{userProfile.location}</span>
                                                </div>
                                                <div className="flex items-center">
                                                    <Calendar className="w-4 h-4 mr-1" />
                                                    <span className="text-sm">{formatJoinDate(userProfile.createdAt)} 가입</span>
                                                </div>
                                            </div>

                                            <div className="flex justify-center md:justify-start space-x-8 mb-4">
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{userProfile.propertyCount || 0}</div>
                                                    <div className="text-sm text-gray-600">보유 부동산</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{userProfile.followers?.length || 0}</div>
                                                    <div className="text-sm text-gray-600">팔로워</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="font-bold text-lg">{userProfile.following?.length || 0}</div>
                                                    <div className="text-sm text-gray-600">팔로잉</div>
                                                </div>
                                            </div>

                                            <p className="text-gray-700 mb-4">{userProfile.bio || '소개가 없습니다.'}</p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {userProfile.investmentGoals?.map((goal, index) => (
                                                    <Badge key={index} variant="secondary">
                                                        {goal}
                                                    </Badge>
                                                ))}
                                            </div>

                                            <div className="flex justify-center md:justify-start space-x-3">
                                                <Button>
                                                    <Users className="w-4 h-4 mr-2" />
                                                    팔로우
                                                </Button>
                                                <Button variant="outline">
                                                    <MessageCircle className="w-4 h-4 mr-2" />
                                                    메시지
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* 게시물 목록 */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">게시물 ({userPosts.length})</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {userPosts.length > 0 ? (
                                        <div className="space-y-6">
                                            {userPosts.map((post) => (
                                                <PostCard
                                                    key={post._id}
                                                    post={post}
                                                    onLike={handleLike}
                                                    onUnlike={handleUnlike}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12">
                                            <p className="text-gray-600">아직 작성한 게시물이 없습니다.</p>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 