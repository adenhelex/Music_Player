"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, Shuffle, Repeat } from "lucide-react";
import Playlist from "./Playlist";

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: string;
  cover: string;
  audioUrl: string;
}

const sampleTracks: Track[] = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    duration: "3:45",
    cover: "🌙",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: 2,
    title: "Electric Sunset",
    artist: "The Waves",
    duration: "4:20",
    cover: "🌅",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: 3,
    title: "Urban Jungle",
    artist: "City Beats",
    duration: "3:12",
    cover: "🏙️",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: 4,
    title: "Ocean Breeze",
    artist: "Coastal Vibes",
    duration: "5:01",
    cover: "🌊",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: 5,
    title: "Mountain High",
    artist: "Echo Valley",
    duration: "4:33",
    cover: "⛰️",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
];

export default function MusicPlayer() {
  const [tracks] = useState<Track[]>(sampleTracks);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = tracks[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (repeatMode === "one") {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [repeatMode, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * tracks.length);
      } while (randomIndex === currentTrackIndex && tracks.length > 1);
      setCurrentTrackIndex(randomIndex);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    }
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (currentTime > 3) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  const toggleRepeat = () => {
    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const selectTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-black/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white/10">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Music className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Music Player</h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Player Section */}
          <div className="space-y-6">
            {/* Album Art */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center text-9xl shadow-2xl">
                {currentTrack.cover}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl" />
            </div>

            {/* Track Info */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-white">{currentTrack.title}</h2>
              <p className="text-xl text-gray-400">{currentTrack.artist}</p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                    (currentTime / duration) * 100
                  }%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`,
                }}
              />
              <div className="flex justify-between text-sm text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={toggleShuffle}
                className={`p-3 rounded-full transition-all ${
                  isShuffle
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <button
                onClick={handlePrevious}
                className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all"
              >
                <SkipBack className="w-6 h-6 text-white" fill="white" />
              </button>

              <button
                onClick={togglePlay}
                className="p-6 bg-purple-600 rounded-full hover:bg-purple-700 transition-all shadow-lg hover:shadow-purple-600/50"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" fill="white" />
                ) : (
                  <Play className="w-8 h-8 text-white" fill="white" />
                )}
              </button>

              <button
                onClick={handleNext}
                className="p-4 bg-white/10 rounded-full hover:bg-white/20 transition-all"
              >
                <SkipForward className="w-6 h-6 text-white" fill="white" />
              </button>

              <button
                onClick={toggleRepeat}
                className={`p-3 rounded-full transition-all relative ${
                  repeatMode !== "off"
                    ? "bg-purple-600 text-white"
                    : "bg-white/10 text-gray-400 hover:bg-white/20"
                }`}
              >
                <Repeat className="w-5 h-5" />
                {repeatMode === "one" && (
                  <span className="absolute top-1 right-1 text-xs font-bold">1</span>
                )}
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3 px-4">
              <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-5 h-5" />
                ) : (
                  <Volume2 className="w-5 h-5" />
                )}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                    (isMuted ? 0 : volume) * 100
                  }%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`,
                }}
              />
            </div>
          </div>

          {/* Playlist Section */}
          <Playlist
            tracks={tracks}
            currentTrackIndex={currentTrackIndex}
            isPlaying={isPlaying}
            onSelectTrack={selectTrack}
          />
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

