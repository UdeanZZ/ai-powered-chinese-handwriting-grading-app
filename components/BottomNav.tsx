"use client";

import React from "react";
import { Home, BookOpen, FileText, Star } from "lucide-react";

export type NavTab = "dashboard" | "syllabus" | "results" | "premium";

interface BottomNavProps {
    activeTab: NavTab;
    onTabChange: (tab: NavTab) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
    const navItems = [
        { id: "dashboard", label: "Dashboard", icon: Home },
        { id: "syllabus", label: "Syllabus", icon: BookOpen },
        { id: "results", label: "Practice", icon: FileText },
        { id: "premium", label: "Premium", icon: Star },
    ] as const;

    return (
        <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-gray-100 px-6 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-between">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                if (item.id === "premium") {
                                    alert("⭐ Premium features are coming soon! Stay tuned.");
                                    return;
                                }
                                onTabChange(item.id);
                            }}
                            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 ${isActive
                                ? "text-emerald-700 font-semibold scale-105"
                                : "text-gray-400 hover:text-gray-600"
                                }`}
                        >
                            <div className="relative">
                                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`} />
                                {isActive && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-600 rounded-full" />
                                )}
                            </div>
                            <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}