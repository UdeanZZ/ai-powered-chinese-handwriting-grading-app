"use client";

import React, { useState } from "react";
import TopHeader from "@/components/TopHeader";
import BottomNav, { NavTab } from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";
import Syllabus from "@/components/Syllabus";
import CameraViewfinder from "@/components/CameraViewFinder";
import ResultScreen from "@/components/ResultScreen";
import { Loader2, Sparkles } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isGrading, setIsGrading] = useState(false);
  const [gradingData, setGradingData] = useState<any>(null);

  // Capture & trigger AI Grading flow
  const handleCapture = async (imageBlob: Blob) => {
    setIsCameraOpen(false);
    setIsGrading(true);
    setActiveTab("results");
    try {
      const formData = new FormData();
      formData.append("file", imageBlob, "worksheet.jpg");
      formData.append("studentId", "lucas-p2");
      formData.append(
        "expectedWords",
        JSON.stringify(["操场", "礼堂", "校园", "老师", "同学", "教室", "图书馆", "食堂", "花园", "运动场"])
      );
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setGradingData(data);
      }
    } catch (err) {
      console.error("Grading failed:", err);
    } finally {
      setIsGrading(false);
    }
  };


  return (
    <main className="min-h-screen bg-[#E5E7EB] flex justify-center items-start sm:py-6">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-md min-h-screen sm:min-h-220 bg-[#F8F9FB] sm:rounded-[36px] sm:shadow-2xl flex flex-col relative overflow-hidden border border-gray-200/60">

        {/* Top Header */}
        <TopHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24 px-5">
          {isGrading && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-[#2D5A52] animate-pulse">
                  <Sparkles className="w-8 h-8" />
                </div>
                <Loader2 className="w-20 h-20 text-[#2D5A52] animate-spin absolute -top-2 -left-2 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Grading Worksheet...</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-60">
                  Gemini 1.5 Flash is analyzing stroke accuracy and Tian Zige grids
                </p>
              </div>
            </div>
          )}

          {!isGrading && activeTab === "dashboard" && (
            <Dashboard onScanClick={() => setIsCameraOpen(true)} />
          )}
          {!isGrading && activeTab === "syllabus" && (
            <Syllabus />
          )}
          {!isGrading && activeTab === "results" && (
            <ResultScreen 
              onRetestMissed={() => setIsCameraOpen(true)} 
              liveData={gradingData}
            />
          )}
          {!isGrading && activeTab === "premium" && (
            <div className="py-4 text-center text-gray-500">Premium</div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Screen 3: Fullscreen Camera Viewfinder Modal */}
        {isCameraOpen && (
          <CameraViewfinder
            onCapture={handleCapture}
            onClose={() => setIsCameraOpen(false)}
          />
        )}
      </div>
    </main>
  );
}