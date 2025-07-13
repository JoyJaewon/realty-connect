"use client"

import { Button } from "@/components/ui/Button"
import { MapPin, Users } from "lucide-react"
import { User } from "@/lib/api"

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

const AvatarImage = ({ src, alt }: { src: string; alt?: string }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover rounded-full" />
)

interface SidebarProps {
    user?: User
    className?: string
}

export default function Sidebar({ user, className = "" }: SidebarProps) {
    // 기본 사용자 정보 (로그인하지 않은 경우)
    const defaultUser = {
        firstName: "김",
        lastName: "투자",
        location: "LA 지역 투자자",
        totalAssets: 2400000,
        propertyCount: 8,
        monthlyRentalIncome: 12800,
        avatar: undefined,
    }

    const currentUser = user || defaultUser

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount)
    }

    const getInitials = (firstName: string, lastName: string) => {
        return `${firstName.charAt(0)}${lastName.charAt(0)}`
    }

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Profile Card */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-12 h-12">
                            {currentUser.avatar ? (
                                <AvatarImage src={currentUser.avatar} alt="Profile" />
                            ) : (
                                <AvatarFallback>
                                    {getInitials(currentUser.firstName, currentUser.lastName)}
                                </AvatarFallback>
                            )}
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-slate-800">
                                {currentUser.firstName}{currentUser.lastName}
                            </h3>
                            <p className="text-sm text-gray-600">
                                {currentUser.location || "투자자"}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">총 자산</span>
                            <span className="font-semibold text-slate-800">
                                {formatCurrency(currentUser.totalAssets || 0)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">보유 물건</span>
                            <span className="font-semibold text-slate-800">
                                {currentUser.propertyCount || 0}개
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-600">월 임대수입</span>
                            <span className="font-semibold text-emerald-600">
                                {formatCurrency(currentUser.monthlyRentalIncome || 0)}
                            </span>
                        </div>
                    </div>

                    <Button className="w-full mt-4 bg-slate-800 hover:bg-slate-700">
                        프로필 수정
                    </Button>
                </CardContent>
            </Card>

            {/* Local Groups Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">내 지역 그룹</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">LA 다가구 투자자</p>
                            <p className="text-xs text-gray-500">324명</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium">OC 단독주택 그룹</p>
                            <p className="text-xs text-gray-500">156명</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent">
                        그룹 더보기
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
} 