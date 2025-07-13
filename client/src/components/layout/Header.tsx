"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import {
    Bell,
    Search,
    Plus,
    Home,
    Menu,
    X,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"

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

// Badge 컴포넌트 (임시)
const Badge = ({
    children,
    variant = "default",
    className = ""
}: {
    children: React.ReactNode;
    variant?: "default" | "outline";
    className?: string
}) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    const variantClasses = {
        default: "bg-gray-100 text-gray-800",
        outline: "border border-gray-300 text-gray-700"
    }

    return (
        <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
            {children}
        </span>
    )
}

interface HeaderProps {
    activeTab: string
    onTabChange?: (tab: string) => void
}

export default function Header({ activeTab, onTabChange }: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const router = useRouter()

    const navigationItems = [
        { id: "feed", label: "커뮤니티", href: "/community" },
        { id: "tools", label: "도구", href: "/tools" },
        { id: "education", label: "교육", href: "/education" },
        { id: "network", label: "네트워크", href: "/network" },
    ]

    const getActiveTab = () => {
        const path = router.pathname
        if (path === "/community") return "feed"
        if (path === "/tools") return "tools"
        if (path === "/education") return "education"
        if (path === "/network") return "network"
        return activeTab
    }

    const currentActiveTab = getActiveTab()

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-8">
                        <Link href="/community" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center">
                                <Home className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-800">RealtyConnect</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex space-x-6">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentActiveTab === item.id
                                        ? "text-slate-800 bg-gray-100"
                                        : "text-gray-600 hover:text-slate-800"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Desktop Right Side */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="검색..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                            />
                        </div>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                            <Plus className="w-4 h-4 mr-1" />
                            포스트
                        </Button>
                        <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                                EN
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-slate-800 text-white">
                                한국어
                            </Badge>
                        </div>
                        <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-slate-800" />
                        <Avatar className="w-8 h-8">
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>김투</AvatarFallback>
                        </Avatar>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-gray-600 hover:text-slate-800"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${currentActiveTab === item.id
                                        ? "text-slate-800 bg-gray-100"
                                        : "text-gray-600 hover:text-slate-800"
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                        <div className="px-2 pb-3 space-y-3">
                            <div className="relative">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="검색..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>
                            <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700">
                                <Plus className="w-4 h-4 mr-1" />
                                포스트
                            </Button>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <Badge variant="outline" className="text-xs">
                                        EN
                                    </Badge>
                                    <Badge variant="outline" className="text-xs bg-slate-800 text-white">
                                        한국어
                                    </Badge>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-slate-800" />
                                    <Avatar className="w-8 h-8">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                        <AvatarFallback>김투</AvatarFallback>
                                    </Avatar>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
} 