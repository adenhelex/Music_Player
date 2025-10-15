"use client";

import React from "react";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      <div className="container mx-auto px-4 py-8">
        <MusicPlayer />
      </div>
    </main>
  );
}

