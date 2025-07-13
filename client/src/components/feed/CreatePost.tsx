"use client"

import { useState } from "react"
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

// Avatar 컴포넌트 (임시)
const Avatar = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}>
        {children}
    </div>
)

const AvatarFallback = ({ children }: { children: React.ReactNode }) => (
    <span className="text-sm font-medium text-gray-700">{children}</span>
)

interface CreatePostProps {
    onPostCreated: (post: Post) => void
}

export default function CreatePost({ onPostCreated }: CreatePostProps) {
    const [content, setContent] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!content.trim()) return

        // TODO: 실제 API 호출로 게시물 생성
        // 임시로 목 데이터 생성
        const mockPost: Post = {
            _id: `temp-${Date.now()}`,
            author: {
                _id: "current-user",
                firstName: "김",
                lastName: "투자",
                email: "kim@example.com",
                username: "kim_investor",
                avatar: "",
                location: "LA 지역",
                followers: [],
                following: [],
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            content: content,
            likes: [],
            comments: [],
            shares: 0,
            tags: [],
            location: "LA 지역",
            isPublic: true,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        onPostCreated(mockPost)
        setContent("")
    }

    return (
        <Card>
            <CardContent className="p-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex items-start space-x-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>김투</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="투자 경험이나 질문을 공유해보세요..."
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                rows={3}
                            />
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    disabled={!content.trim()}
                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    게시
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
} 