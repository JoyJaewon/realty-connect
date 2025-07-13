"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Calculator, DollarSign, TrendingUp, Home } from "lucide-react"
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

interface BRRRRInputs {
    purchasePrice: number
    rehabCost: number
    closingCosts: number
    monthlyRent: number
    operatingExpenses: number
    refinanceValue: number
    loanToValue: number
    interestRate: number
    loanTerm: number
}

export default function BRRRRCalculator() {
    const [inputs, setInputs] = useState<BRRRRInputs>({
        purchasePrice: 250000,
        rehabCost: 50000,
        closingCosts: 7500,
        monthlyRent: 2500,
        operatingExpenses: 800,
        refinanceValue: 400000,
        loanToValue: 75,
        interestRate: 7.5,
        loanTerm: 30
    })

    const [results, setResults] = useState<any>(null)

    const calculateBRRRR = () => {
        const totalInvestment = inputs.purchasePrice + inputs.rehabCost + inputs.closingCosts
        const refinanceLoanAmount = (inputs.refinanceValue * inputs.loanToValue) / 100
        const monthlyPayment = calculateMonthlyPayment(refinanceLoanAmount, inputs.interestRate, inputs.loanTerm)
        const monthlyCashFlow = inputs.monthlyRent - inputs.operatingExpenses - monthlyPayment
        const annualCashFlow = monthlyCashFlow * 12
        const cashRecovered = refinanceLoanAmount
        const cashLeftIn = totalInvestment - cashRecovered
        const cashOnCashReturn = cashLeftIn > 0 ? (annualCashFlow / cashLeftIn) * 100 : 0
        const totalROI = ((annualCashFlow + (inputs.refinanceValue - totalInvestment)) / totalInvestment) * 100

        setResults({
            totalInvestment,
            refinanceLoanAmount,
            monthlyPayment,
            monthlyCashFlow,
            annualCashFlow,
            cashRecovered,
            cashLeftIn,
            cashOnCashReturn,
            totalROI,
            equityCreated: inputs.refinanceValue - totalInvestment
        })
    }

    const calculateMonthlyPayment = (principal: number, rate: number, years: number) => {
        const monthlyRate = rate / 100 / 12
        const numPayments = years * 12
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
            (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const formatPercent = (percent: number) => {
        return `${percent.toFixed(1)}%`
    }

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
                        <Calculator className="w-6 h-6 text-emerald-600" />
                        <h1 className="text-2xl font-bold text-gray-900">BRRRR 계산기</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-6">
                        {/* Buy Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Home className="w-5 h-5 mr-2 text-blue-600" />
                                    1. Buy (구매)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        구매 가격
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.purchasePrice}
                                        onChange={(e) => setInputs({ ...inputs, purchasePrice: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="250000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        클로징 비용
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.closingCosts}
                                        onChange={(e) => setInputs({ ...inputs, closingCosts: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="7500"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rehab Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <DollarSign className="w-5 h-5 mr-2 text-orange-600" />
                                    2. Rehab (수리)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        수리 비용
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.rehabCost}
                                        onChange={(e) => setInputs({ ...inputs, rehabCost: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="50000"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Rent Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                                    3. Rent (임대)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        월 임대료
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.monthlyRent}
                                        onChange={(e) => setInputs({ ...inputs, monthlyRent: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="2500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        월 운영비용
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.operatingExpenses}
                                        onChange={(e) => setInputs({ ...inputs, operatingExpenses: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="800"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Refinance Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <Calculator className="w-5 h-5 mr-2 text-purple-600" />
                                    4. Refinance (재융자)
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        재융자 평가액
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.refinanceValue}
                                        onChange={(e) => setInputs({ ...inputs, refinanceValue: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="400000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        LTV 비율 (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.loanToValue}
                                        onChange={(e) => setInputs({ ...inputs, loanToValue: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="75"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        이자율 (%)
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={inputs.interestRate}
                                        onChange={(e) => setInputs({ ...inputs, interestRate: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="7.5"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        융자 기간 (년)
                                    </label>
                                    <input
                                        type="number"
                                        value={inputs.loanTerm}
                                        onChange={(e) => setInputs({ ...inputs, loanTerm: Number(e.target.value) })}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="30"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Button
                            onClick={calculateBRRRR}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                        >
                            BRRRR 분석 계산하기
                        </Button>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {results ? (
                            <>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">계산 결과</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-blue-50 rounded-lg">
                                                    <h4 className="font-semibold text-blue-900">총 투자금액</h4>
                                                    <p className="text-2xl font-bold text-blue-600">
                                                        {formatCurrency(results.totalInvestment)}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-green-50 rounded-lg">
                                                    <h4 className="font-semibold text-green-900">재융자 금액</h4>
                                                    <p className="text-2xl font-bold text-green-600">
                                                        {formatCurrency(results.refinanceLoanAmount)}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-purple-50 rounded-lg">
                                                    <h4 className="font-semibold text-purple-900">회수된 현금</h4>
                                                    <p className="text-2xl font-bold text-purple-600">
                                                        {formatCurrency(results.cashRecovered)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="p-4 bg-amber-50 rounded-lg">
                                                    <h4 className="font-semibold text-amber-900">남은 투자금</h4>
                                                    <p className="text-2xl font-bold text-amber-600">
                                                        {formatCurrency(results.cashLeftIn)}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-emerald-50 rounded-lg">
                                                    <h4 className="font-semibold text-emerald-900">월 현금흐름</h4>
                                                    <p className="text-2xl font-bold text-emerald-600">
                                                        {formatCurrency(results.monthlyCashFlow)}
                                                    </p>
                                                </div>
                                                <div className="p-4 bg-indigo-50 rounded-lg">
                                                    <h4 className="font-semibold text-indigo-900">생성된 자본</h4>
                                                    <p className="text-2xl font-bold text-indigo-600">
                                                        {formatCurrency(results.equityCreated)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">수익률 분석</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200">
                                                <h4 className="font-semibold text-green-900 mb-2">Cash-on-Cash 수익률</h4>
                                                <p className="text-3xl font-bold text-green-600">
                                                    {formatPercent(results.cashOnCashReturn)}
                                                </p>
                                                <p className="text-sm text-green-700 mt-2">
                                                    연간 현금흐름 / 남은 투자금
                                                </p>
                                            </div>
                                            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                                                <h4 className="font-semibold text-blue-900 mb-2">총 ROI</h4>
                                                <p className="text-3xl font-bold text-blue-600">
                                                    {formatPercent(results.totalROI)}
                                                </p>
                                                <p className="text-sm text-blue-700 mt-2">
                                                    (현금흐름 + 자본증가) / 총 투자금
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl">월별 현금흐름 분석</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6">
                                        <div className="space-y-3">
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">월 임대료</span>
                                                <span className="font-semibold text-green-600">+{formatCurrency(inputs.monthlyRent)}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">운영비용</span>
                                                <span className="font-semibold text-red-600">-{formatCurrency(inputs.operatingExpenses)}</span>
                                            </div>
                                            <div className="flex justify-between py-2 border-b">
                                                <span className="text-gray-600">융자 상환</span>
                                                <span className="font-semibold text-red-600">-{formatCurrency(results.monthlyPayment)}</span>
                                            </div>
                                            <div className="flex justify-between py-3 border-t-2 border-gray-300">
                                                <span className="font-semibold text-gray-900">순 현금흐름</span>
                                                <span className={`font-bold text-lg ${results.monthlyCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                    {formatCurrency(results.monthlyCashFlow)}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        BRRRR 분석 준비 완료
                                    </h3>
                                    <p className="text-gray-600">
                                        왼쪽 입력 폼을 작성하고 "계산하기" 버튼을 클릭하세요.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
} 