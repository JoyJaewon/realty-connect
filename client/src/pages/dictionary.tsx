"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Search, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

// Card 컴포넌트 (임시)
const Card = ({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} onClick={onClick}>
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

interface DictionaryTerm {
    term: string
    definition: string
    category: string
    example: string
    conversation: string
}

const dictionaryTerms: DictionaryTerm[] = [
    {
        term: "DSCR (Debt Service Coverage Ratio)",
        definition: "부채상환비율. 부동산의 순운영수익(NOI)을 연간 부채상환액으로 나눈 비율로, 융자 심사의 핵심 지표입니다.",
        category: "융자",
        example: "NOI $60,000 ÷ 연간 부채상환액 $48,000 = DSCR 1.25",
        conversation: "A: 'DSCR이 1.25면 융자 받을 수 있을까요?' B: '네, 대부분의 DSCR 융자는 1.2 이상이면 승인 가능합니다.'"
    },
    {
        term: "NOI (Net Operating Income)",
        definition: "순운영수익. 총 임대수입에서 운영비용(세금, 보험, 관리비 등)을 뺀 순수익으로, 부동산 투자의 핵심 지표입니다.",
        category: "투자분석",
        example: "총 임대수입 $120,000 - 운영비용 $60,000 = NOI $60,000",
        conversation: "A: 'NOI가 얼마나 되어야 좋은 투자인가요?' B: '지역마다 다르지만 구매가격의 8-12% 정도면 괜찮습니다.'"
    },
    {
        term: "1031 Exchange",
        definition: "동종 부동산 교환. 투자용 부동산을 매각하고 다른 투자용 부동산을 구매할 때 양도소득세를 이연할 수 있는 제도입니다.",
        category: "세금",
        example: "아파트 매각 후 45일 내 대상 물건 지정, 180일 내 교환 완료",
        conversation: "A: '1031 교환하면 세금을 안 내도 되나요?' B: '이연되는 거예요. 나중에 현금으로 매각하면 그때 내야 합니다.'"
    },
    {
        term: "BRRRR",
        definition: "Buy, Rehab, Rent, Refinance, Repeat. 부동산을 구매해 수리 후 임대하고, 재융자로 자본을 회수해 다시 투자하는 전략입니다.",
        category: "투자전략",
        example: "50만불 구매 → 5만불 수리 → 월세 $4,000 → 70만불 재융자 → 자본 회수",
        conversation: "A: 'BRRRR 전략이 정말 효과적인가요?' B: '시장과 지역에 따라 다르지만, 자본 효율성이 높아 인기 있는 전략입니다.'"
    },
    {
        term: "Cap Rate (Capitalization Rate)",
        definition: "자본화율. NOI를 부동산 가격으로 나눈 비율로, 부동산의 수익률을 나타내는 지표입니다.",
        category: "투자분석",
        example: "NOI $60,000 ÷ 부동산 가격 $800,000 = Cap Rate 7.5%",
        conversation: "A: 'Cap Rate가 높을수록 좋은 건가요?' B: '일반적으로 그렇지만, 지역 평균과 비교해야 합니다. 너무 높으면 리스크가 있을 수 있어요.'"
    },
    {
        term: "Eviction (퇴거)",
        definition: "임차인을 법적으로 퇴거시키는 절차. 각 주마다 다른 법률과 절차를 따라야 합니다.",
        category: "임대관리",
        example: "캘리포니아: 3일 Notice → 법원 제출 → 심리 → 판결 → 집행",
        conversation: "A: '임차인이 3개월째 월세를 안 내는데 어떻게 해야 하나요?' B: '먼저 Notice to Pay or Quit을 보내고, 주 법률에 따라 퇴거 절차를 진행하세요.'"
    },
    {
        term: "Fix & Flip",
        definition: "부동산을 저렴하게 구매해 수리한 후 단기간 내에 매각하여 수익을 얻는 투자 전략입니다.",
        category: "투자전략",
        example: "40만불 구매 → 8만불 수리 → 60만불 매각 → 12만불 수익",
        conversation: "A: 'Fix & Flip이 BRRRR보다 좋은가요?' B: '단기 현금 수익은 높지만, 세금과 리스크가 크고 지속가능성이 떨어집니다.'"
    },
    {
        term: "Cash Flow",
        definition: "현금 흐름. 임대수입에서 모든 비용(융자 상환, 세금, 보험, 관리비 등)을 뺀 순현금수익입니다.",
        category: "투자분석",
        example: "월 임대수입 $3,000 - 총 비용 $2,500 = 월 현금흐름 $500",
        conversation: "A: '현금흐름이 마이너스면 투자하면 안 되나요?' B: '단기적으로는 가능하지만, 장기적으로 플러스가 되어야 안전한 투자입니다.'"
    }
]

const categories = ["전체", "융자", "투자분석", "투자전략", "세금", "임대관리"]

export default function Dictionary() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [selectedTerm, setSelectedTerm] = useState<DictionaryTerm | null>(null)

    const filteredTerms = dictionaryTerms.filter(term => {
        const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            term.definition.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategory === "전체" || term.category === selectedCategory
        return matchesSearch && matchesCategory
    })

    if (selectedTerm) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedTerm(null)}
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>뒤로가기</span>
                            </Button>
                            <h1 className="text-2xl font-bold text-gray-900">용어 사전</h1>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <Card>
                        <CardContent className="p-8">
                            <div className="mb-6">
                                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                                    {selectedTerm.category}
                                </span>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                    {selectedTerm.term}
                                </h1>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    {selectedTerm.definition}
                                </p>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3">예시</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-gray-700">{selectedTerm.example}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <MessageCircle className="w-5 h-5 mr-2" />
                                    실제 대화 예시
                                </h3>
                                <div className="bg-blue-50 p-4 rounded-lg">
                                    <p className="text-gray-700 italic">"{selectedTerm.conversation}"</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <Button variant="outline" className="flex items-center space-x-2">
                                    <ArrowLeft className="w-4 h-4" />
                                    <span>홈으로</span>
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-gray-900">용어 사전</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter */}
                <div className="mb-8">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="용어를 검색하세요..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className="text-sm"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Terms Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTerms.map((term, index) => (
                        <Card
                            key={index}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => setSelectedTerm(term)}
                        >
                            <CardContent className="p-6">
                                <div className="mb-3">
                                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                                        {term.category}
                                    </span>
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                        {term.term}
                                    </h3>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {term.definition}
                                    </p>
                                </div>
                                <div className="text-blue-600 text-sm font-medium">
                                    자세히 보기 →
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {filteredTerms.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">검색 결과가 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    )
} 