"use client";

import React from "react";
import { Music, Play } from "lucide-react";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

interface PlaylistProps {
  tracks: Track[];
  currentTrackIndex: number;
  isPlaying: boolean;
  onSelectTrack: (index: number) => void;
}

export default function Playlist({ tracks, currentTrackIndex, isPlaying, onSelectTrack }: PlaylistProps) {
  return (
    <div className="bg-black/20 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <Music className="w-6 h-6 text-purple-400" />
        <h3 className="text-2xl font-bold text-white">Playlist</h3>
      </div>

      <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            onClick={() => onSelectTrack(index)}
            className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
              index === currentTrackIndex
                ? "bg-purple-600/30 border border-purple-500/50"
                : "bg-white/5 hover:bg-white/10 border border-transparent"
            }`}
          >
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-3xl">
                {track.cover}
              </div>
              {index === currentTrackIndex && isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: "0ms" }} />
                    <div className="w-1 h-6 bg-white animate-pulse" style={{ animationDelay: "150ms" }} />
                    <div className="w-1 h-4 bg-white animate-pulse" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className={`font-semibold truncate ${
                index === currentTrackIndex ? "text-purple-300" : "text-white"
              }`}>
                {track.title}
              </h4>
              <p className="text-sm text-gray-400 truncate">{track.artist}</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">{track.duration}</span>
              {index === currentTrackIndex && (
                <Play className="w-4 h-4 text-purple-400" fill="currentColor" />
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }
      `}</style>
    </div>
  );
}

