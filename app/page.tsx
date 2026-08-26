"use client";

import React, { useState } from "react";
import TopHeader from "@/components/TopHeader";
import BottomNav, { NavTab } from "@/components/BottomNav";
import Dashboard from "@/components/Dashboard";

export default function Home() {
  const [activeTab, setActiveTab] = useState<NavTab>("dashboard");

  const handleScanClick = () => {
    // We will hook this directly to Screen 3 (Camera Viewfinder)
    alert("Opening Camera Viewfinder...");
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
            <Dashboard onScanClick={handleScanClick} />
          )}
          {activeTab === "syllabus" && (
            <div className="py-4 text-center text-gray-500">Syllabus (Screen 2) coming next!</div>
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
      </div>
    </main>
  );
}