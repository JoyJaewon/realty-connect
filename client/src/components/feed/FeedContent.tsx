"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/Button"
import { Heart, MessageCircle, Share2, BookOpen, BarChart3 } from "lucide-react"
import { postsApi, Post } from "@/lib/api"
import PostCard from "./PostCard"
import CreatePost from "./CreatePost"

// Card 컴포넌트 (임시)
const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        {children}
    </div>
)

const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={className}>{children}</div>
)

export default function FeedContent() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const fetchPosts = async (pageNum: number = 1) => {
        try {
            setLoading(true)
            const response = await postsApi.getPosts({ page: pageNum, limit: 10 })

            if (response.success && response.data.posts) {
                if (pageNum === 1) {
                    setPosts(response.data.posts)
                } else {
                    setPosts(prev => [...prev, ...response.data.posts!])
                }

                setHasMore(response.data.pagination.page < response.data.pagination.pages)
            }
        } catch (err) {
            console.error('Failed to fetch posts:', err)
            setError('게시물을 불러오는데 실패했습니다.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchPosts(nextPage)
        }
    }

    const handlePostCreated = (newPost: Post) => {
        setPosts(prev => [newPost, ...prev])
    }

    const handleLike = async (postId: string) => {
        try {
            await postsApi.likePost(postId)
            setPosts(prev => prev.map(post =>
                post._id === postId
                    ? { ...post, likes: [...post.likes, 'current-user-id'] }
                    : post
            ))
        } catch (err) {
            console.error('Failed to like post:', err)
        }
    }

    const handleUnlike = async (postId: string) => {
        try {
            await postsApi.unlikePost(postId)
            setPosts(prev => prev.map(post =>
                post._id === postId
                    ? { ...post, likes: post.likes.filter(id => id !== 'current-user-id') }
                    : post
            ))
        } catch (err) {
            console.error('Failed to unlike post:', err)
        }
    }

    if (error) {
        return (
            <div className="text-center py-8">
                <p className="text-red-500">{error}</p>
                <Button onClick={() => fetchPosts(1)} className="mt-4">
                    다시 시도
                </Button>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Create Post */}
            <CreatePost onPostCreated={handlePostCreated} />

            {/* Posts Feed */}
            {loading && posts.length === 0 ? (
                <div className="text-center py-8">
                    <p className="text-gray-500">게시물을 불러오는 중...</p>
                </div>
            ) : (
                <>
                    {posts.map((post) => (
                        <PostCard
                            key={post._id}
                            post={post}
                            onLike={handleLike}
                            onUnlike={handleUnlike}
                        />
                    ))}

                    {hasMore && (
                        <div className="text-center py-4">
                            <Button
                                onClick={handleLoadMore}
                                disabled={loading}
                                variant="outline"
                            >
                                {loading ? '불러오는 중...' : '더 보기'}
                            </Button>
                        </div>
                    )}

                    {!hasMore && posts.length > 0 && (
                        <div className="text-center py-4">
                            <p className="text-gray-500">모든 게시물을 확인했습니다.</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
} 