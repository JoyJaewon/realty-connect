"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { ArrowLeft, Map, TrendingUp, Shield, GraduationCap, Users, DollarSign, Search } from "lucide-react"
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

interface MarketData {
    city: string
    state: string
    medianHomePrice: number
    medianRent: number
    rentalYield: number
    crimeRate: number
    schoolRating: number
    populationGrowth: number
    unemployment: number
    walkScore: number
}

const sampleMarketData: MarketData[] = [
    {
        city: "Austin",
        state: "TX",
        medianHomePrice: 450000,
        medianRent: 2200,
        rentalYield: 5.9,
        crimeRate: 3.2,
        schoolRating: 8.1,
        populationGrowth: 2.8,
        unemployment: 3.1,
        walkScore: 42
    },
    {
        city: "Atlanta",
        state: "GA",
        medianHomePrice: 320000,
        medianRent: 1800,
        rentalYield: 6.8,
        crimeRate: 5.8,
        schoolRating: 7.2,
        populationGrowth: 1.9,
        unemployment: 3.8,
        walkScore: 48
    },
    {
        city: "Phoenix",
        state: "AZ",
        medianHomePrice: 380000,
        medianRent: 1900,
        rentalYield: 6.0,
        crimeRate: 4.1,
        schoolRating: 6.9,
        populationGrowth: 2.2,
        unemployment: 3.5,
        walkScore: 41
    },
    {
        city: "Tampa",
        state: "FL",
        medianHomePrice: 350000,
        medianRent: 1700,
        rentalYield: 5.8,
        crimeRate: 4.5,
        schoolRating: 7.5,
        populationGrowth: 2.1,
        unemployment: 2.9,
        walkScore: 50
    },
    {
        city: "Nashville",
        state: "TN",
        medianHomePrice: 420000,
        medianRent: 2000,
        rentalYield: 5.7,
        crimeRate: 6.2,
        schoolRating: 7.8,
        populationGrowth: 1.8,
        unemployment: 2.7,
        walkScore: 28
    },
    {
        city: "Charlotte",
        state: "NC",
        medianHomePrice: 340000,
        medianRent: 1600,
        rentalYield: 5.6,
        crimeRate: 4.8,
        schoolRating: 7.9,
        populationGrowth: 1.5,
        unemployment: 3.2,
        walkScore: 26
    },
    {
        city: "Dallas",
        state: "TX",
        medianHomePrice: 390000,
        medianRent: 1950,
        rentalYield: 6.0,
        crimeRate: 4.2,
        schoolRating: 7.1,
        populationGrowth: 1.7,
        unemployment: 3.4,
        walkScore: 46
    },
    {
        city: "Denver",
        state: "CO",
        medianHomePrice: 520000,
        medianRent: 2100,
        rentalYield: 4.8,
        crimeRate: 3.9,
        schoolRating: 8.3,
        populationGrowth: 1.3,
        unemployment: 3.0,
        walkScore: 61
    }
]

export default function MarketAnalysis() {
    const [selectedCity, setSelectedCity] = useState<MarketData | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState<keyof MarketData>("rentalYield")

    const filteredData = sampleMarketData
        .filter(city =>
            city.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
            city.state.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === "city" || sortBy === "state") {
                return a[sortBy].localeCompare(b[sortBy])
            }
            return (b[sortBy] as number) - (a[sortBy] as number)
        })

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

    const getYieldColor = (rentalYield: number) => {
        if (rentalYield >= 7) return "text-green-600 bg-green-50"
        if (rentalYield >= 5.5) return "text-yellow-600 bg-yellow-50"
        return "text-red-600 bg-red-50"
    }

    const getCrimeColor = (rate: number) => {
        if (rate <= 3) return "text-green-600 bg-green-50"
        if (rate <= 5) return "text-yellow-600 bg-yellow-50"
        return "text-red-600 bg-red-50"
    }

    const getSchoolColor = (rating: number) => {
        if (rating >= 8) return "text-green-600 bg-green-50"
        if (rating >= 7) return "text-yellow-600 bg-yellow-50"
        return "text-red-600 bg-red-50"
    }

    const getGrowthColor = (growth: number) => {
        if (growth >= 2) return "text-green-600 bg-green-50"
        if (growth >= 1) return "text-yellow-600 bg-yellow-50"
        return "text-red-600 bg-red-50"
    }

    if (selectedCity) {
        return (
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedCity(null)}
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>목록으로</span>
                            </Button>
                            <Map className="w-6 h-6 text-blue-600" />
                            <h1 className="text-2xl font-bold text-gray-900">
                                {selectedCity.city}, {selectedCity.state} 시장 분석
                            </h1>
                        </div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Key Metrics */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">핵심 지표</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                                            <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">중간 주택 가격</p>
                                            <p className="text-lg font-bold text-blue-600">
                                                {formatCurrency(selectedCity.medianHomePrice)}
                                            </p>
                                        </div>
                                        <div className="text-center p-4 bg-green-50 rounded-lg">
                                            <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">임대 수익률</p>
                                            <p className="text-lg font-bold text-green-600">
                                                {formatPercent(selectedCity.rentalYield)}
                                            </p>
                                        </div>
                                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                                            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">범죄율</p>
                                            <p className="text-lg font-bold text-purple-600">
                                                {selectedCity.crimeRate}/10
                                            </p>
                                        </div>
                                        <div className="text-center p-4 bg-amber-50 rounded-lg">
                                            <GraduationCap className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                                            <p className="text-sm text-gray-600">학군 점수</p>
                                            <p className="text-lg font-bold text-amber-600">
                                                {selectedCity.schoolRating}/10
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-xl">상세 분석</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">중간 임대료</span>
                                                    <span className="text-lg font-bold text-green-600">
                                                        {formatCurrency(selectedCity.medianRent)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">인구 성장률</span>
                                                    <span className="text-lg font-bold text-blue-600">
                                                        {formatPercent(selectedCity.populationGrowth)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">실업률</span>
                                                    <span className="text-lg font-bold text-red-600">
                                                        {formatPercent(selectedCity.unemployment)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                                    <span className="font-medium">Walk Score</span>
                                                    <span className="text-lg font-bold text-purple-600">
                                                        {selectedCity.walkScore}/100
                                                    </span>
                                                </div>
                                                <div className="p-4 bg-blue-50 rounded-lg">
                                                    <h4 className="font-semibold text-blue-900 mb-2">투자 점수</h4>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="flex-1 bg-blue-200 rounded-full h-2">
                                                            <div
                                                                className="bg-blue-600 h-2 rounded-full"
                                                                style={{ width: `${(selectedCity.rentalYield / 10) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="text-sm font-medium text-blue-600">
                                                            {((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3).toFixed(1)}/10
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Right Sidebar */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">투자 분석</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className={`p-3 rounded-lg ${getYieldColor(selectedCity.rentalYield)}`}>
                                            <h4 className="font-semibold">임대 수익률</h4>
                                            <p className="text-2xl font-bold">{formatPercent(selectedCity.rentalYield)}</p>
                                            <p className="text-sm">
                                                {selectedCity.rentalYield >= 7 ? "매우 좋음" :
                                                    selectedCity.rentalYield >= 5.5 ? "보통" : "낮음"}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${getCrimeColor(selectedCity.crimeRate)}`}>
                                            <h4 className="font-semibold">치안 상태</h4>
                                            <p className="text-2xl font-bold">{selectedCity.crimeRate}/10</p>
                                            <p className="text-sm">
                                                {selectedCity.crimeRate <= 3 ? "안전" :
                                                    selectedCity.crimeRate <= 5 ? "보통" : "주의"}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${getSchoolColor(selectedCity.schoolRating)}`}>
                                            <h4 className="font-semibold">학군 품질</h4>
                                            <p className="text-2xl font-bold">{selectedCity.schoolRating}/10</p>
                                            <p className="text-sm">
                                                {selectedCity.schoolRating >= 8 ? "우수" :
                                                    selectedCity.schoolRating >= 7 ? "양호" : "보통"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">투자 추천도</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="text-center">
                                        <div className="w-24 h-24 mx-auto mb-4 relative">
                                            <div className="w-full h-full rounded-full bg-gray-200">
                                                <div
                                                    className="w-full h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500"
                                                    style={{
                                                        clipPath: `polygon(0 0, ${((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3) * 10}% 0, ${((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3) * 10}% 100%, 0 100%)`
                                                    }}
                                                ></div>
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-xl font-bold text-white">
                                                    {((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3).toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">종합 점수</p>
                                        <p className="font-semibold">
                                            {((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3) >= 7 ? "강력 추천" :
                                                ((selectedCity.rentalYield + selectedCity.schoolRating + (10 - selectedCity.crimeRate)) / 3) >= 6 ? "추천" : "보통"}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
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
                        <Map className="w-6 h-6 text-blue-600" />
                        <h1 className="text-2xl font-bold text-gray-900">미국 전역 지역 분석</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="도시 또는 주를 검색하세요..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as keyof MarketData)}
                            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="rentalYield">임대 수익률순</option>
                            <option value="medianHomePrice">주택 가격순</option>
                            <option value="populationGrowth">인구 성장률순</option>
                            <option value="schoolRating">학군 점수순</option>
                            <option value="crimeRate">치안 상태순</option>
                        </select>
                    </div>
                </div>

                {/* Market Data Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">시장 데이터 비교</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            도시
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            주택 가격
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            임대 수익률
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            범죄율
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            학군
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            인구 성장률
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            액션
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredData.map((city, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="font-medium text-gray-900">
                                                    {city.city}, {city.state}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {formatCurrency(city.medianHomePrice)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getYieldColor(city.rentalYield)}`}>
                                                    {formatPercent(city.rentalYield)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCrimeColor(city.crimeRate)}`}>
                                                    {city.crimeRate}/10
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSchoolColor(city.schoolRating)}`}>
                                                    {city.schoolRating}/10
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getGrowthColor(city.populationGrowth)}`}>
                                                    {formatPercent(city.populationGrowth)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => setSelectedCity(city)}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    상세 보기
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 