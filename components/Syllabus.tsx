"use client";

import React, { useState } from "react";
import { Printer, ChevronRight } from "lucide-react";

export interface VocabWord {
    char: string;
    pinyin: string;
}

export interface Lesson {
    id: string;
    week: string;
    title: string;
    level: string;
    status: "pending" | "completed" | "needs_revision";
    score?: number;
    words: VocabWord[];
}

const mockLessons: Lesson[] = [
    {
        id: "lesson-10",
        week: "Week 4",
        title: "《第十课 - 我们的校园》",
        level: "P2",
        status: "pending",
        words: [
            { char: "校园", pinyin: "xiào yuán" },
            { char: "操场", pinyin: "cāo chǎng" },
            { char: "老师", pinyin: "lǎo shī" },
            { char: "礼堂", pinyin: "lǐ táng" },
        ],
    },
    {
        id: "lesson-9",
        week: "Week 3",
        title: "《第九课 - 我爱我的家》",
        level: "P2",
        status: "completed",
        score: 80,
        words: [
            { char: "爸爸", pinyin: "bà ba" },
            { char: "妈妈", pinyin: "mā ma" },
            { char: "温暖", pinyin: "wēn nuǎn" },
        ],
    },
    {
        id: "lesson-8",
        week: "Week 2",
        title: "《第八课 - 快乐的周末》",
        level: "P2",
        status: "needs_revision",
        words: [
            { char: "玩耍", pinyin: "wán shuǎ" },
            { char: "公园", pinyin: "gōng yuán" },
        ],
    },
];

export default function Syllabus() {
    const [selectedLevel, setSelectedLevel] = useState("P2");
    const levels = ["P1", "P2", "P3", "P4", "P5", "P6"];

    const getStatusBadge = (status: Lesson["status"], score?: number) => {
        switch (status) {
            case "pending":
                return (
                    <span className="bg-[#FFF9EA] text-[#C48C26] border border-[#FDE6B8] text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-2xs">
                        Pending Practice
                    </span>
                );
            case "completed":
                return (
                    <span className="bg-[#EAF5F1] text-[#2D5A52] border border-[#BDE0D4] text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-2xs">
                        Completed ({score}%)
                    </span>
                );
            case "needs_revision":
                return (
                    <span className="bg-[#FDF2F2] text-[#D34B4B] border border-[#FACBCB] text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-2xs">
                        Needs Revision
                    </span>
                );
        }
    };

    return (
        <div className="space-y-4 pt-1 pb-8">
            {/* 1. P1–P6 Tab Selector Pills */}
            <div className="flex items-center justify-between gap-1.5 py-1 overflow-x-auto no-scrollbar">
                {levels.map((lvl) => {
                    const isSelected = selectedLevel === lvl;
                    return (
                        <button
                            key={lvl}
                            onClick={() => setSelectedLevel(lvl)}
                            className={`flex-1 py-2 rounded-full text-xs font-bold transition-all ${isSelected
                                    ? "bg-[#2D5A52] text-white shadow-md scale-102"
                                    : "bg-white text-gray-600 border border-gray-100 hover:bg-gray-50"
                                }`}
                        >
                            {lvl}
                        </button>
                    );
                })}
            </div>

            {/* 2. Section Header */}
            <div className="flex items-center justify-between px-1 pt-1">
                <h2 className="text-sm font-bold text-gray-900">
                    MOE Primary {selectedLevel.replace("P", "")} Syllabus
                </h2>
                <span className="text-xs text-gray-400 font-medium">24 Lessons Total</span>
            </div>

            {/* 3. Lesson Cards List */}
            <div className="space-y-3.5">
                {mockLessons.map((lesson) => (
                    <div
                        key={lesson.id}
                        className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col justify-between transition-all hover:shadow-md"
                    >
                        {/* Top row: Week & Status Tag */}
                        <div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-[#2D5A52]">
                                    {lesson.week}
                                </span>
                                {getStatusBadge(lesson.status, lesson.score)}
                            </div>

                            {/* Lesson Title */}
                            <h3 className="text-base font-bold text-gray-900 mt-1">
                                {lesson.title}
                            </h3>

                            {/* Chinese Vocabulary Grid */}
                            <div className="grid grid-cols-3 gap-2.5 mt-3.5">
                                {lesson.words.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-[#FAF8F5] rounded-2xl p-3 flex flex-col items-center justify-center border border-gray-100/50 shadow-2xs hover:bg-[#F5F2ED] transition-colors"
                                    >
                                        <span className="text-base font-bold text-gray-900 tracking-wide">
                                            {item.char}
                                        </span>
                                        <span className="text-[10px] text-gray-400 font-medium mt-0.5">
                                            {item.pinyin}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="mt-4 pt-3 border-t border-gray-100/80 flex items-center justify-between">
                            <button
                                onClick={() => alert(`Downloading A4 Worksheet for ${lesson.title}`)}
                                className="flex items-center gap-2 text-xs font-semibold text-[#2D5A52] hover:opacity-80 transition-opacity"
                            >
                                <Printer className="w-4 h-4 stroke-[2.2]" />
                                <span>Print A4 Worksheet (PDF)</span>
                            </button>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}