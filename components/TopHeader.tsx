"use client";

import React from "react";
import { Bell, ChevronDown } from "lucide-react";

export default function TopHeader() {
    return (
        <header className="sticky top-0 z-30 bg-[#F8F9FB]/90 backdrop-blur-md px-5 pt-4 pb-3 flex items-center justify-between">
            {/* User / Student Profile Switcher */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-sm">
                    S
                </div>
                <div>
                    <p className="text-[11px] font-medium text-gray-500 leading-none">Welcome Back,</p>
                    <button className="flex items-center gap-1 mt-0.5 group">
                        <span className="text-sm font-bold text-gray-900">Lucas</span>
                        <span className="text-xs text-gray-400 font-normal">• Primary 2</span>
                        <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </button>
                </div>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-full bg-white border border-gray-100 text-gray-600 shadow-sm hover:bg-gray-50 transition-colors">
                <Bell className="w-5 h-5 stroke-2" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
        </header>
    );
}