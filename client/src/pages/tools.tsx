"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
    Calculator,
    TrendingUp,
    MapPin,
    DollarSign,
    BookOpen,
    FileText,
    Users,
    Book,
    Map,
} from "lucide-react"
import Link from "next/link"

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

export default function ToolsPage() {
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

    const renderToolsContent = () => (
        <div className="space-y-6">
            {/* 실전 가이드 */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">실전 가이드</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/guides/dscr-loan">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                                <h3 className="font-semibold mb-2">DSCR 융자 받는 법</h3>
                                <p className="text-sm text-gray-600">부채상환비율 기반 융자 완전 정복 가이드</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/guides/eviction-process">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <FileText className="w-8 h-8 text-red-600 mb-3" />
                                <h3 className="font-semibold mb-2">임차인 퇴거 절차</h3>
                                <p className="text-sm text-gray-600">주별 퇴거 법률과 실제 절차 안내</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/guides/1031-exchange">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <TrendingUp className="w-8 h-8 text-amber-600 mb-3" />
                                <h3 className="font-semibold mb-2">1031 교환 활용법</h3>
                                <p className="text-sm text-gray-600">세금 이연을 위한 1031 교환 완전 가이드</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/dictionary">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <Book className="w-8 h-8 text-purple-600 mb-3" />
                                <h3 className="font-semibold mb-2">용어 사전</h3>
                                <p className="text-sm text-gray-600">부동산 투자 용어와 실제 대화 예시</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* 투자 계산기 */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">투자 계산기</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/calculators/brrrr">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <Calculator className="w-8 h-8 text-emerald-600 mb-3" />
                                <h3 className="font-semibold mb-2">BRRRR 계산기</h3>
                                <p className="text-sm text-gray-600">Buy, Rehab, Rent, Refinance, Repeat 전략 수익성 분석</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/calculators/rental">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <Calculator className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold mb-2">임대 수익 계산기</h3>
                                <p className="text-sm text-gray-600">단기/중기/장기 임대 수익률 비교 분석</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/calculators/flipping">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <Calculator className="w-8 h-8 text-orange-600 mb-3" />
                                <h3 className="font-semibold mb-2">플리핑 계산기</h3>
                                <p className="text-sm text-gray-600">Fix & Flip 프로젝트 수익성 분석</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/calculators/dscr">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <DollarSign className="w-8 h-8 text-green-600 mb-3" />
                                <h3 className="font-semibold mb-2">DSCR 융자 계산기</h3>
                                <p className="text-sm text-gray-600">부채상환비율 기반 융자 조건 시뮬레이션</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* 자료실 */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">PDF & 템플릿 자료실</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link href="/resources/contracts">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <FileText className="w-8 h-8 text-indigo-600 mb-3" />
                                <h3 className="font-semibold mb-2">계약서 샘플</h3>
                                <p className="text-sm text-gray-600">임대차, 매매, 관리 계약서 템플릿</p>
                            </CardContent>
                        </Card>
                    </Link>
                    <Link href="/resources/checklists">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <FileText className="w-8 h-8 text-teal-600 mb-3" />
                                <h3 className="font-semibold mb-2">체크리스트</h3>
                                <p className="text-sm text-gray-600">융자 서류, 실사, 검사 체크리스트</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>

            {/* 지역 분석 도구 */}
            <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">지역 분석 도구</h2>
                <div className="grid grid-cols-1 gap-4">
                    <Link href="/market-analysis">
                        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                            <CardContent className="p-6">
                                <Map className="w-8 h-8 text-blue-600 mb-3" />
                                <h3 className="font-semibold mb-2">미국 전역 지역 분석</h3>
                                <p className="text-sm text-gray-600">임대 수익률, 범죄율, 학군, 인구 성장률 시각화</p>
                            </CardContent>
                        </Card>
                    </Link>
                </div>
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            <Header activeTab="tools" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar - Desktop only */}
                    <div className="hidden lg:block lg:col-span-1">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div className="col-span-1 lg:col-span-2">
                        {renderToolsContent()}
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