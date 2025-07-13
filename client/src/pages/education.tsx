"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"

// Layout Components
import Header from "../components/layout/Header"
import Sidebar from "../components/layout/Sidebar"

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
    <span className="text-sm font-medium text-gray-700">{children}</span>
)

export default function EducationPage() {
    const renderRightSidebar = () => (
        <div className="space-y-6">
            {/* 웹세미나 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">이번 주 웹세미나</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-3 bg-amber-50 rounded-lg">
                        <h4 className="font-medium text-sm">DSCR 융자 완전정복</h4>
                        <p className="text-xs text-gray-600">2025년 1월 15일 (수) 7:00 PM PST</p>
                        <Button size="sm" className="w-full mt-2 bg-amber-600 hover:bg-amber-700">
                            신청하기
                        </Button>
                    </div>
                    <div className="p-3 bg-emerald-50 rounded-lg">
                        <h4 className="font-medium text-sm">1031 교환 실전 가이드</h4>
                        <p className="text-xs text-gray-600">2025년 1월 18일 (토) 2:00 PM PST</p>
                        <Button size="sm" className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
                            신청하기
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* 멘토 찾기 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">멘토 찾기</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-3">
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>김전</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-medium text-sm">김전문가</h4>
                            <p className="text-xs text-gray-600">Commercial RE, 10년 경험</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                            <AvatarFallback>박경</AvatarFallback>
                        </Avatar>
                        <div>
                            <h4 className="font-medium text-sm">박경험자</h4>
                            <p className="text-xs text-gray-600">Fix & Flip, 50+ deals</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* 오늘의 팁 */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">오늘의 팁</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="p-3 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">임차인 신용 대출법</h4>
                        <p className="text-xs text-gray-600 mb-2">
                            임차인 신용 조회 시 <strong>Notice to Pay or Quit</strong> 통지서 발송 전, 각 주의 법적 요구사항을
                            확인하세요.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    const renderEducationContent = () => (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>초보자 완주 코스</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                            <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                1
                            </div>
                            <div>
                                <h4 className="font-medium">부동산 투자 기초</h4>
                                <p className="text-sm text-gray-600">완료됨 • 30분</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                2
                            </div>
                            <div>
                                <h4 className="font-medium">융자 종류와 조건</h4>
                                <p className="text-sm text-gray-600">진행중 • 45분</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                3
                            </div>
                            <div>
                                <h4 className="font-medium">물건 분석과 실사</h4>
                                <p className="text-sm text-gray-600">잠김 • 60분</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeTab="education" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Desktop only */}
                    <div className="hidden lg:block lg:col-span-1">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-2">
                        {renderEducationContent()}
                    </div>

                    {/* Right Sidebar - Desktop only */}
                    <div className="hidden lg:block lg:col-span-1">
                        {renderRightSidebar()}
                    </div>
                </div>
            </div>
        </div>
    )
} 