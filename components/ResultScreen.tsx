"use client";

import React from "react";
import { Share2, RotateCcw, Check, X } from "lucide-react";

export interface MatrixRow {
    char: string;
    pinyin: string;
    history: {
        "8 Oct"?: boolean;
        "10 Oct"?: boolean;
        "12 Oct"?: boolean;
        "14 Oct"?: boolean;
    };
}

const mockMatrixData: MatrixRow[] = [
    { char: "操场", pinyin: "cāo chǎng", history: { "8 Oct": false, "10 Oct": false, "12 Oct": true } },
    { char: "礼堂", pinyin: "lǐ táng", history: { "8 Oct": false, "10 Oct": false, "12 Oct": false } },
    { char: "校园", pinyin: "xiào yuán", history: { "8 Oct": false, "10 Oct": true, "12 Oct": true } },
    { char: "老师", pinyin: "lǎo shī", history: { "8 Oct": true, "10 Oct": true, "12 Oct": true } },
    { char: "同学", pinyin: "tóng xué", history: { "8 Oct": false, "10 Oct": true, "12 Oct": true } },
    { char: "教室", pinyin: "jiào shì", history: { "8 Oct": true, "10 Oct": true, "12 Oct": true } },
    { char: "图书馆", pinyin: "tú shū guǎn", history: { "8 Oct": false, "10 Oct": false, "12 Oct": true } },
    { char: "食堂", pinyin: "shí táng", history: { "8 Oct": true, "10 Oct": true, "12 Oct": true } },
    { char: "花园", pinyin: "huā yuán", history: { "8 Oct": false, "10 Oct": true, "12 Oct": true } },
    { char: "运动场", pinyin: "yùn dòng chǎng", history: { "8 Oct": false, "10 Oct": false, "12 Oct": true } },
];

interface ResultsScreenProps {
    onRetestMissed?: () => void;
}

export default function ResultsScreen({ onRetestMissed }: ResultsScreenProps) {
    const dates = ["8 Oct", "10 Oct", "12 Oct", "14 Oct"];

    return (
        <div className="space-y-4 pt-1 pb-10">
            {/* 1. Header & Status Badge */}
            <div className="flex items-start justify-between px-1">
                <div>
                    <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                        Test Feedback
                    </p>
                    <h1 className="text-xl font-bold text-gray-900 font-serif mt-0.5">
                        Week 4 Syllabus Test
                    </h1>
                </div>
                <span className="bg-[#FDF2F2] text-[#D34B4B] border border-[#FACBCB] text-[11px] font-semibold px-2.5 py-0.5 rounded-lg shadow-2xs">
                    Needs Revision
                </span>
            </div>

            {/* 2. Score Overview Header Card */}
            <div className="bg-white rounded-3xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-gray-100 flex items-center gap-5">
                {/* Circular Percentage Badge */}
                <div className="w-20 h-20 rounded-full border-[3.5px] border-[#D34B4B] flex items-center justify-center shrink-0">
                    <span className="text-xl font-black text-[#D34B4B] tracking-tight">
                        80%
                    </span>
                </div>

                {/* Score Details */}
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-black text-gray-900 leading-tight">
                        Score: 8/10
                    </h2>
                    <p className="text-[11px] text-gray-400 font-medium mt-1">
                        Graded on 14 Oct, 3:12 PM
                    </p>
                    <p className="text-xs font-bold text-[#D34B4B] mt-1.5">
                        2 characters missed
                    </p>
                </div>
            </div>

            {/* 3. Historical Matrix Table */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-2.5 px-1">
                    Results over time
                </h3>

                <div className="bg-white rounded-2xl border border-gray-200/70 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto no-scrollbar">
                        <table className="w-full text-left border-collapse min-w-85">
                            {/* Table Header */}
                            <thead>
                                <tr className="bg-[#EDF2EF] border-b border-gray-200/80">
                                    <th className="py-2.5 px-3 text-[11px] font-bold text-gray-600 w-28">
                                        Character
                                    </th>
                                    {dates.map((d) => (
                                        <th
                                            key={d}
                                            className="py-2.5 px-2 text-center text-[11px] font-bold text-gray-600 border-l border-gray-200/60"
                                        >
                                            {d}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody className="divide-y divide-gray-100 text-xs">
                                {mockMatrixData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/60 transition-colors">
                                        {/* Character & Pinyin Column */}
                                        <td className="py-2.5 px-3">
                                            <div className="font-bold text-gray-900 text-sm leading-tight">
                                                {row.char}
                                            </div>
                                            <div className="text-[10px] text-gray-400 font-medium">
                                                {row.pinyin}
                                            </div>
                                        </td>

                                        {/* Dynamic Status Marks (Ticks / Crosses) */}
                                        {dates.map((d) => {
                                            const status = (row.history as any)[d];
                                            return (
                                                <td
                                                    key={d}
                                                    className="py-2.5 px-2 text-center border-l border-gray-100 font-bold"
                                                >
                                                    {status === true && (
                                                        <span className="text-emerald-600 font-black text-base inline-block">
                                                            ✓
                                                        </span>
                                                    )}
                                                    {status === false && (
                                                        <span className="text-rose-500 font-black text-base inline-block">
                                                            ✗
                                                        </span>
                                                    )}
                                                    {status === undefined && (
                                                        <span className="text-gray-200 text-xs">—</span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4. Bottom Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
                <button
                    onClick={() => alert("Report link copied to clipboard!")}
                    className="flex-1 bg-[#EAF3F0] hover:bg-[#DDECE8] active:scale-98 text-[#2D5A52] font-bold py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                    <Share2 className="w-4 h-4 stroke-[2.2]" />
                    <span>Share Report</span>
                </button>

                <button
                    onClick={onRetestMissed}
                    className="flex-1 bg-[#2D5A52] hover:bg-[#234841] active:scale-98 text-white font-bold py-3.5 px-4 rounded-full text-xs flex items-center justify-center gap-2 transition-all shadow-[0_4px_14px_rgba(45,90,82,0.25)]"
                >
                    <RotateCcw className="w-4 h-4 stroke-[2.2]" />
                    <span>Retest Missed</span>
                </button>
            </div>
        </div>
    );
}