"use client";

import React, { useState } from "react";
import TopHeader from "@/components/TopHeader";
import BottomNav, { NavTab } from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";
import Syllabus from "@/components/Syllabus";
import CameraViewfinder from "@/components/CameraViewFinder";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (imageBlob: Blob, previewUrl: string) => {
    console.log("Captured image blob size:", imageBlob.size);
    setCapturedImage(previewUrl);
    setIsCameraOpen(false);

    // Switch tab to results to display grading
    setActiveTab("results");
  };


  return (
    <main className="min-h-screen bg-[#E5E7EB] flex justify-center items-start sm:py-6">
      {/* Mobile Device Frame */}
      <div className="w-full max-w-md min-h-screen sm:min-h-220 bg-[#F8F9FB] sm:rounded-[36px] sm:shadow-2xl flex flex-col relative overflow-hidden border border-gray-200/60">

        {/* Top Header */}
        <TopHeader />

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24 px-5">
          {activeTab === "dashboard" && (
            <Dashboard onScanClick={() => setIsCameraOpen(true)} />
          )}
          {activeTab === "syllabus" && (
            <Syllabus />
          )}
          {activeTab === "results" && (
            <div className="py-4 text-center text-gray-500">Practice / Results (Screen 4)</div>
          )}
          {activeTab === "favorites" && (
            <div className="py-4 text-center text-gray-500">Favorites & Profile</div>
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