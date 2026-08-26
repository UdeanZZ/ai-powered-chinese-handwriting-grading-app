"use client";

import React, { useRef, useState, useEffect } from "react";
import { X, Zap, ZapOff, Camera, Upload, AlertCircle } from "lucide-react";

interface CameraViewfinderProps {
    onCapture: (imageBlob: Blob, previewUrl: string) => void;
    onClose: () => void;
}

export default function CameraViewfinder({ onCapture, onClose }: CameraViewfinderProps) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [torchOn, setTorchOn] = useState(false);
    const [torchSupported, setTorchSupported] = useState(false);
    const [isCapturing, setIsCapturing] = useState(false);

    // 1. Initialize Camera
    useEffect(() => {
        let active = true;

        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        facingMode: { ideal: "environment" }, // Prefer rear camera
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                    },
                    audio: false,
                });

                if (!active) {
                    stream.getTracks().forEach((track) => track.stop());
                    return;
                }

                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasPermission(true);

                // Check torch / flash support
                const track = stream.getVideoTracks()[0];
                const capabilities = track.getCapabilities?.() as any;
                if (capabilities?.torch) {
                    setTorchSupported(true);
                }
            } catch (err) {
                console.error("Camera access error:", err);
                setHasPermission(false);
            }
        }

        startCamera();

        return () => {
            active = false;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop());
            }
        };
    }, []);

    // 2. Toggle Flashlight / Torch
    const toggleTorch = async () => {
        if (!streamRef.current) return;
        const track = streamRef.current.getVideoTracks()[0];
        try {
            await (track as any).applyConstraints({
                advanced: [{ torch: !torchOn }],
            });
            setTorchOn(!torchOn);
        } catch (e) {
            console.warn("Torch not supported on this device/browser");
        }
    };

    // 3. Shutter Capture Handler
    const handleShutter = () => {
        if (!videoRef.current || isCapturing) return;
        setIsCapturing(true);

        const video = videoRef.current;
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth || 1280;
        canvas.height = video.videoHeight || 720;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob(
            (blob) => {
                if (blob) {
                    const previewUrl = URL.createObjectURL(blob);
                    onCapture(blob, previewUrl);
                }
                setIsCapturing(false);
            },
            "image/jpeg",
            0.95
        );
    };

    // 4. File Upload Fallback
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            onCapture(file, previewUrl);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between max-w-md mx-auto overflow-hidden select-none">
            {/* Top Header Controls */}
            <div className="relative z-20 flex items-center justify-between px-5 pt-6 pb-4 bg-linear-to-b from-black/80 to-transparent text-white">
                <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
                >
                    <X className="w-5 h-5 text-white" />
                </button>

                <h2 className="text-sm font-bold tracking-wide">Align Worksheet</h2>

                <button
                    onClick={toggleTorch}
                    disabled={!torchSupported}
                    className={`p-2 rounded-full backdrop-blur-md transition-colors ${torchOn
                        ? "bg-amber-400 text-gray-900 shadow-lg"
                        : torchSupported
                            ? "bg-white/20 text-white hover:bg-white/30"
                            : "bg-white/10 text-gray-500 opacity-50 cursor-not-allowed"
                        }`}
                >
                    {torchOn ? <Zap className="w-5 h-5 fill-current" /> : <ZapOff className="w-5 h-5" />}
                </button>
            </div>

            {/* Live Video Feed */}
            <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden">
                {hasPermission === false ? (
                    <div className="text-center px-6 text-white space-y-4">
                        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
                        <p className="text-sm font-medium">Camera access unavailable or denied.</p>
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-[#2D5A52] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 mx-auto"
                        >
                            <Upload className="w-4 h-4" />
                            Upload Image Instead
                        </button>
                    </div>
                ) : (
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}

                {/* Viewfinder Overlay Box */}
                {hasPermission && (
                    <div className="relative z-10 w-[84%] aspect-3/4 max-h-[65%] border-2 border-white/40 rounded-3xl flex flex-col justify-between p-4 shadow-[0_0_0_9999px_rgba(0,0,0,0.55)]">
                        {/* 4 Corner Guidelines (L-brackets) */}
                        <div className="absolute -top-1 -left-1 w-7 h-7 border-t-4 border-l-4 border-emerald-400 rounded-tl-xl" />
                        <div className="absolute -top-1 -right-1 w-7 h-7 border-t-4 border-r-4 border-emerald-400 rounded-tr-xl" />
                        <div className="absolute -bottom-1 -left-1 w-7 h-7 border-b-4 border-l-4 border-emerald-400 rounded-bl-xl" />
                        <div className="absolute -bottom-1 -right-1 w-7 h-7 border-b-4 border-r-4 border-emerald-400 rounded-br-xl" />

                        {/* QR Target / Alignment Box in top right */}
                        <div className="self-end w-12 h-12 border-2 border-dashed border-white/60 rounded-lg flex items-center justify-center">
                            <span className="text-[8px] text-white/70 font-semibold tracking-tighter uppercase">QR Box</span>
                        </div>

                        {/* Floating Instruction Banner */}
                        <div className="self-center bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium px-3.5 py-1.5 rounded-full shadow-md">
                            Keep page flat and inside the brackets
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Shutter Action Bar */}
            <div className="relative z-20 px-6 pt-4 pb-8 bg-linear-to-t from-black/90 to-transparent flex flex-col items-center gap-3">
                <div className="flex items-center justify-between w-full max-w-70">
                    {/* File Upload Fallback Trigger */}
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 transition-colors"
                        title="Upload from device"
                    >
                        <Upload className="w-5 h-5" />
                    </button>

                    {/* Large Shutter Button */}
                    <button
                        onClick={handleShutter}
                        disabled={isCapturing || hasPermission === false}
                        className="w-18 h-18 rounded-full border-4 border-white flex items-center justify-center p-1 shadow-[0_0_20px_rgba(255,255,255,0.4)] active:scale-95 transition-transform"
                    >
                        <div className="w-full h-full bg-[#2D5A52] rounded-full flex items-center justify-center">
                            <Camera className="w-7 h-7 text-white" />
                        </div>
                    </button>

                    {/* Spacer to balance layout */}
                    <div className="w-11" />
                </div>

                <span className="text-xs font-semibold text-white/80 tracking-wider">
                    Capture & Grade
                </span>

                {/* Hidden File Input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
}