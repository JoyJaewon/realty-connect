"use client"

import { useEffect } from "react"
import { useRouter } from "next/router"

export default function HomePage() {
    const router = useRouter()

    useEffect(() => {
        // 메인 페이지 접속 시 커뮤니티 페이지로 리다이렉트
        router.push("/community")
    }, [router])

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">RealtyConnect</h1>
                <p className="text-gray-600">페이지를 로딩 중입니다...</p>
            </div>
        </div>
    )
} 