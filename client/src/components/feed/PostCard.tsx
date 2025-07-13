"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share2, BookOpen, BarChart3 } from "lucide-react"
import { Post } from "@/lib/api"

// Card 컴포넌트 (임시)
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
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

// Avatar 컴포넌트 (임시)
const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
        {children}
    </div>
)

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
    <span className="text-sm font-medium text-gray-700">{children}</span>
)

const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
)

interface PostCardProps {
    post: Post
    onLike: (postId: string) => void
    onUnlike: (postId: string) => void
}

export default function PostCard({ post, onLike, onUnlike }: PostCardProps) {
    const [isLiked, setIsLiked] = useState(false) // TODO: 실제 좋아요 상태 확인

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

        if (diffInHours < 1) return "방금 전"
        if (diffInHours < 24) return `${diffInHours}시간 전`

        const diffInDays = Math.floor(diffInHours / 24)
        if (diffInDays < 7) return `${diffInDays}일 전`

        return date.toLocaleDateString('ko-KR')
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`
    }

    const handleLikeClick = () => {
        if (isLiked) {
            onUnlike(post._id)
            setIsLiked(false)
        } else {
            onLike(post._id)
            setIsLiked(true)
        }
    }

    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-start space-x-3 mb-4">
                    <Avatar>
                        {post.author.avatar ? (
                            <AvatarImage src={post.author.avatar} alt={post.author.firstName} />
                        ) : (
                            <AvatarFallback>
                                {getInitials(post.author.firstName, post.author.lastName)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-semibold text-slate-800">
                                {post.author.firstName}{post.author.lastName}
                            </h4>
                            <Badge variant="secondary" className="text-xs">
                                {post.location} • {formatTimeAgo(post.createdAt)}
                            </Badge>
                        </div>
                        <p className="text-gray-700 mb-3">{post.content}</p>

                        {/* Property Info */}
                        {post.propertyInfo && (
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">물건 정보</p>
                                        <p className="font-medium">{post.propertyInfo.city}, {post.propertyInfo.state}</p>
                                        <p className="text-sm">구매가: {formatCurrency(post.propertyInfo.purchasePrice)}</p>
                                    </div>
                                    {post.propertyInfo.expectedRent > 0 && (
                                        <div>
                                            <p className="text-sm text-gray-600">예상 임대료</p>
                                            <p className="font-medium text-emerald-600">
                                                {formatCurrency(post.propertyInfo.expectedRent)}/월
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Poll */}
                        {post.poll && (
                            <div className="bg-slate-50 p-4 rounded-lg mb-4">
                                <h5 className="font-medium mb-2 flex items-center">
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    {post.poll.question}
                                </h5>
                                <div className="space-y-2">
                                    {post.poll.options.map((option, index) => {
                                        const totalVotes = post.poll!.options.reduce((sum, opt) => sum + opt.votes, 0)
                                        const percentage = totalVotes > 0 ? Math.round((option.votes / totalVotes) * 100) : 0

                                        return (
                                            <div key={index} className="flex justify-between items-center">
                                                <span className="text-sm">{option.text}</span>
                                                <div className="flex items-center space-x-2">
                                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-emerald-500 h-2 rounded-full"
                                                            style={{ width: `${percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium">{percentage}%</span>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Attachments */}
                        {post.attachments && post.attachments.length > 0 && (
                            <div className="bg-gray-200 rounded-lg p-8 mb-4 flex items-center justify-center">
                                <div className="text-center">
                                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                    <p className="text-gray-500">{post.attachments[0].name}</p>
                                </div>
                            </div>
                        )}

                        {/* Images */}
                        {post.images && post.images.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                                {post.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Post image ${index + 1}`}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <button
                                onClick={handleLikeClick}
                                className={`flex items-center space-x-1 hover:text-red-500 transition-colors ${isLiked ? 'text-red-500' : ''
                                    }`}
                            >
                                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                                <span>{post.likes.length}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments.length}</span>
                            </button>
                            <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
                                <Share2 className="w-4 h-4" />
                                <span>{post.shares > 0 ? post.shares : '공유'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 