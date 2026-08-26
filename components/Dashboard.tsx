"use client";

import React, { useState } from "react";
import {
    Camera,
    CheckCircle2,
    BookOpen,
    Bell,
    TrendingUp
} from "lucide-react";

interface DashboardProps {
    onScanClick?: () => void;
}

export default function Dashboard({ onScanClick }: DashboardProps) {
    // Calendar dates mock
    const [selectedDay, setSelectedDay] = useState("14");

    const calendarDays = [
        { day: "Mon", date: "12" },
        { day: "Tue", date: "13" },
        { day: "Wed", date: "14", isToday: true },
        { day: "Thu", date: "15" },
        { day: "Fri", date: "16" },
        { day: "Sat", date: "17" },
    ];

    // Credits calculation
    const creditsRemaining = 12;
    const totalCredits = 20;
    const creditProgress = (creditsRemaining / totalCredits) * 100;

    return (
        <div className="space-y-4 pt-1 pb-6">
            {/* 1. Prepaid Lesson Credits Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-[11px] font-bold tracking-wider text-gray-400 uppercase">
                            Prepaid Lesson Credits
                        </p>
                        <div className="flex items-baseline gap-1.5 mt-1.5">
                            <span className="text-2xl font-black text-gray-900 leading-none">
                                {creditsRemaining}
                            </span>
                            <span className="text-sm font-semibold text-gray-500">
                                of {totalCredits} Remaining
                            </span>
                        </div>
                    </div>
                    <button className="bg-[#2D5A52] hover:bg-[#244841] active:scale-95 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-sm">
                        Top Up
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="mt-4">
                    <div className="w-full bg-[#E5EEEB] h-2.5 rounded-full overflow-hidden">
                        <div
                            className="bg-[#2D5A52] h-full rounded-full transition-all duration-500"
                            style={{ width: `${creditProgress}%` }}
                        />
                    </div>
                    <p className="text-[11px] text-gray-400 mt-2 font-medium">
                        Credits expire on 30 Nov 2026
                    </p>
                </div>
            </div>

            {/* 2. Metrics Grid (Mastery Rate & Practiced) */}
            <div className="grid grid-cols-2 gap-3.5">
                {/* Mastery Rate */}
                <div className="bg-white rounded-3xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            Mastery Rate
                        </span>
                        <div className="w-6 h-6 rounded-full bg-[#EAF3F0] text-[#2D5A52] flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-xl font-black text-gray-900">82.4%</p>
                        <p className="text-[11px] font-medium text-[#2D5A52] flex items-center gap-0.5 mt-0.5">
                            +3.1% this month
                        </p>
                    </div>
                </div>

                {/* Practiced */}
                <div className="bg-white rounded-3xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                            Practiced
                        </span>
                        <div className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                            <BookOpen className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                    </div>
                    <div className="mt-3">
                        <p className="text-xl font-black text-gray-900 leading-tight">
                            48 <span className="text-base font-bold text-gray-800">Characters</span>
                        </p>
                        <p className="text-[11px] font-medium text-gray-400 mt-0.5">
                            8 lists covered
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. Upcoming Ting Xie Section */}
            <div className="pt-2">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="text-sm font-bold text-gray-900">Upcoming Ting Xie</h3>
                    <button className="text-xs font-semibold text-[#2D5A52] hover:underline">
                        View All
                    </button>
                </div>

                {/* Calendar Strip */}
                <div className="bg-white rounded-3xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100">
                    <div className="grid grid-cols-6 gap-1.5 text-center">
                        {calendarDays.map((item) => {
                            const isSelected = selectedDay === item.date;
                            return (
                                <button
                                    key={item.date}
                                    onClick={() => setSelectedDay(item.date)}
                                    className={`flex flex-col items-center py-2 px-1 rounded-2xl transition-all ${isSelected
                                        ? "bg-[#EAF3F0] border border-[#2D5A52] text-[#2D5A52] shadow-sm font-bold"
                                        : "text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    <span className={`text-[10px] font-medium ${isSelected ? "text-[#2D5A52]" : "text-gray-400"}`}>
                                        {item.day}
                                    </span>
                                    <span className="text-sm font-bold mt-1">{item.date}</span>
                                    {isSelected && (
                                        <span className="w-1 h-1 bg-[#2D5A52] rounded-full mt-1" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Upcoming Test Reminder Banner */}
                <div className="mt-3 bg-[#EAF3F0] border border-[#2D5A52]/20 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm">
                    <div className="w-10 h-10 rounded-full bg-white text-[#2D5A52] flex items-center justify-center shrink-0 shadow-sm">
                        <Bell className="w-6 h-6 stroke-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-900 truncate">
                            Week 4: 《第十课》 Spelling Test
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">
                            Wednesday, 14 Oct at 3:00 PM • P2 MOE Syllabus
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. Action Button: Scan & Grade Worksheet */}
            <div className="pt-3 flex justify-center">
                <button
                    onClick={onScanClick}
                    className="w-full max-w-[320px] bg-[#2D5A52] hover:bg-[#234841] active:scale-98 text-white font-bold py-3.5 px-6 rounded-full shadow-[0_8px_20px_rgba(45,90,82,0.3)] flex items-center justify-center gap-2.5 transition-all text-sm tracking-wide"
                >
                    <Camera className="w-5 h-5 stroke-[2.2]" />
                    <span>Scan & Grade Worksheet</span>
                </button>
            </div>
        </div>
    );
}