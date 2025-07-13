"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, DollarSign, FileText, CheckCircle, AlertCircle, Calculator } from "lucide-react"
import Link from "next/link"

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

const steps = [
    {
        title: "1. DSCR 이해하기",
        description: "부채상환비율(DSCR)의 개념과 계산 방법을 파악합니다.",
        details: [
            "DSCR = 순운영수익(NOI) ÷ 연간 부채상환액",
            "일반적으로 1.2 이상이 필요 (대부분 1.25 이상 선호)",
            "높을수록 융자 승인 확률과 조건이 좋아짐",
            "개인 소득이 아닌 부동산 자체의 수익성으로 평가"
        ]
    },
    {
        title: "2. 자격 요건 확인",
        description: "DSCR 융자를 받기 위한 기본 자격 조건들을 점검합니다.",
        details: [
            "신용 점수: 일반적으로 620점 이상 (680점 이상 권장)",
            "현금 보유: 구매가격의 20-25% 다운페이먼트",
            "자산 증명: 6개월치 리저브 자금 보유",
            "부동산 투자 경험 (일부 대출기관 요구)"
        ]
    },
    {
        title: "3. 필요 서류 준비",
        description: "융자 신청에 필요한 모든 서류를 미리 준비합니다.",
        details: [
            "임대차 계약서 (기존 임대 중인 경우)",
            "임대료 수입 증명 (은행 입금 내역)",
            "부동산 세금 고지서",
            "보험 증서 및 견적서",
            "수리/관리 비용 견적서",
            "개인 재정 서류 (은행 잔고, 자산 증명)",
            "신용 보고서"
        ]
    },
    {
        title: "4. 대출 기관 비교",
        description: "여러 DSCR 대출 기관의 조건을 비교하여 최적의 선택을 합니다.",
        details: [
            "이자율 비교 (고정 vs 변동)",
            "융자 조건 (LTV, 상환 기간)",
            "수수료 구조 (오리지네이션, 언더라이팅)",
            "승인 속도 및 절차",
            "지역별 대출 가능 여부",
            "최소 DSCR 요구사항"
        ]
    },
    {
        title: "5. 신청 및 승인",
        description: "선택한 대출 기관에 정식 신청하고 승인 과정을 진행합니다.",
        details: [
            "온라인 또는 전화로 사전 승인 신청",
            "필요 서류 제출",
            "부동산 감정 평가 주문",
            "언더라이팅 과정 진행",
            "조건부 승인 및 최종 승인",
            "클로징 일정 조율"
        ]
    }
]

const documents = [
    {
        category: "부동산 관련",
        items: [
            "임대차 계약서 (현재 및 과거)",
            "임대료 수입 증명서 (12개월)",
            "부동산 세금 고지서",
            "보험 증서 및 견적서",
            "HOA 비용 증명 (해당시)",
            "관리 비용 내역서"
        ]
    },
    {
        category: "개인 재정",
        items: [
            "은행 잔고 증명서 (2개월)",
            "투자 계좌 명세서",
            "기타 자산 증명서",
            "신용 보고서",
            "부채 내역서",
            "세금 보고서 (2년)"
        ]
    },
    {
        category: "추가 서류",
        items: [
            "부동산 감정 평가서",
            "타이틀 보험 증서",
            "환경 검사 보고서",
            "건물 검사 보고서",
            "임대 시장 분석 보고서",
            "수리 견적서 (필요시)"
        ]
    }
]

const tips = [
    {
        icon: <CheckCircle className="w-5 h-5 text-green-600" />,
        title: "DSCR 개선 방법",
        content: "임대료 인상, 운영비용 절감, 추가 수입원 창출을 통해 DSCR을 높일 수 있습니다."
    },
    {
        icon: <AlertCircle className="w-5 h-5 text-amber-600" />,
        title: "주의사항",
        content: "시장 임대료와 실제 임대료 차이, 공실률, 계절적 변동을 고려해야 합니다."
    },
    {
        icon: <Calculator className="w-5 h-5 text-blue-600" />,
        title: "계산 팁",
        content: "보수적으로 계산하고, 예상치 못한 비용을 위해 10-15% 여유분을 두세요."
    },
    {
        icon: <FileText className="w-5 h-5 text-purple-600" />,
        title: "서류 준비",
        content: "모든 서류를 미리 준비하면 승인 과정이 훨씬 빨라집니다."
    }
]

export default function DSCRLoanGuide() {
    const [activeStep, setActiveStep] = useState(0)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="outline" className="flex items-center space-x-2">
                                <ArrowLeft className="w-4 h-4" />
                                <span>홈으로</span>
                            </Button>
                        </Link>
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h1 className="text-2xl font-bold text-gray-900">DSCR 융자 받는 법</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Introduction */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                DSCR 융자 완전 정복 가이드
                            </h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                부채상환비율(DSCR) 기반 융자는 개인 소득이 아닌 부동산 자체의 수익성으로 평가받는
                                투자용 부동산 전용 융자입니다. 이 가이드를 통해 DSCR 융자의 모든 것을 알아보세요.
                            </p>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="font-semibold text-blue-900 mb-2">DSCR이란?</h3>
                            <p className="text-blue-800 mb-4">
                                Debt Service Coverage Ratio (부채상환비율) = 순운영수익(NOI) ÷ 연간 부채상환액
                            </p>
                            <div className="bg-white p-4 rounded border border-blue-200">
                                <p className="text-sm text-gray-700">
                                    <strong>예시:</strong> 월 임대료 $3,000, 월 운영비용 $800, 월 융자 상환 $1,800인 경우<br />
                                    NOI = ($3,000 - $800) × 12 = $26,400<br />
                                    연간 부채상환액 = $1,800 × 12 = $21,600<br />
                                    DSCR = $26,400 ÷ $21,600 = 1.22
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Steps Navigation */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">단계별 가이드</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="space-y-1">
                                    {steps.map((step, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveStep(index)}
                                            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${activeStep === index ? 'bg-blue-50 border-r-4 border-blue-600' : ''
                                                }`}
                                        >
                                            <h4 className={`font-medium ${activeStep === index ? 'text-blue-900' : 'text-gray-900'
                                                }`}>
                                                {step.title}
                                            </h4>
                                            <p className="text-sm text-gray-600 mt-1">
                                                {step.description}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Step Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl text-blue-900">
                                    {steps[activeStep].title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-gray-700 mb-6">
                                    {steps[activeStep].description}
                                </p>
                                <div className="space-y-3">
                                    {steps[activeStep].details.map((detail, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-700">{detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between">
                            <Button
                                variant="outline"
                                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                                disabled={activeStep === 0}
                            >
                                이전 단계
                            </Button>
                            <Button
                                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                                disabled={activeStep === steps.length - 1}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                다음 단계
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Required Documents */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">필요 서류 체크리스트</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {documents.map((doc, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{doc.category}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-3">
                                        {doc.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex items-start space-x-3">
                                                <input
                                                    type="checkbox"
                                                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                />
                                                <label className="text-sm text-gray-700">
                                                    {item}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Tips and Warnings */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">프로 팁 & 주의사항</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {tips.map((tip, index) => (
                            <Card key={index}>
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-3">
                                        {tip.icon}
                                        <div>
                                            <h3 className="font-semibold text-gray-900 mb-2">
                                                {tip.title}
                                            </h3>
                                            <p className="text-gray-700 text-sm">
                                                {tip.content}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <Card className="mt-12">
                    <CardContent className="p-8 text-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            DSCR 계산기로 시뮬레이션해보세요
                        </h2>
                        <p className="text-gray-600 mb-6">
                            실제 부동산 정보를 입력하여 DSCR을 계산하고 융자 가능성을 확인해보세요.
                        </p>
                        <div className="space-x-4">
                            <Link href="/calculators/dscr">
                                <Button className="bg-green-600 hover:bg-green-700">
                                    DSCR 계산기 사용하기
                                </Button>
                            </Link>
                            <Link href="/dictionary">
                                <Button variant="outline">
                                    용어 사전 보기
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 