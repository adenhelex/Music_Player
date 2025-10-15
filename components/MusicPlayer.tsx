"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
} from "lucide-react";
import { Song, Playlist, songsLibrary } from "@/lib/songsData";
import SearchBar from "./SearchBar";
import SongLibrary from "./SongLibrary";
import PlaylistSidebar from "./PlaylistSidebar";
import PlaylistView from "./PlaylistView";

export default function MusicPlayer() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylistId, setCurrentPlaylistId] = useState<string | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<"off" | "all" | "one">("off");
  const [searchQuery, setSearchQuery] = useState("");

  const audioRef = useRef<HTMLAudioElement>(null);

  // Load playlists from localStorage on mount
  useEffect(() => {
    const savedPlaylists = localStorage.getItem("musicPlaylists");
    if (savedPlaylists) {
      try {
        const parsed = JSON.parse(savedPlaylists);
        setPlaylists(parsed.map((p: any) => ({ ...p, createdAt: new Date(p.createdAt) })));
      } catch (e) {
        console.error("Failed to load playlists:", e);
      }
    }
  }, []);

  // Save playlists to localStorage whenever they change
  useEffect(() => {
    if (playlists.length > 0 || localStorage.getItem("musicPlaylists")) {
      localStorage.setItem("musicPlaylists", JSON.stringify(playlists));
    }
  }, [playlists]);

  // Audio event listeners
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
  }, [repeatMode, currentSong]);

  // Volume control
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Auto-play when song changes
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSong]);

  // Filter songs based on search
  const filteredSongs = songsLibrary.filter(
    (song) =>
      song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.album.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    if (!currentSong) return;

    const songsToPlay = currentPlaylistId
      ? songsLibrary.filter((s) =>
          playlists.find((p) => p.id === currentPlaylistId)?.songIds.includes(s.id)
        )
      : songsLibrary;

    const currentIndex = songsToPlay.findIndex((s) => s.id === currentSong.id);

    if (isShuffle) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * songsToPlay.length);
      } while (randomIndex === currentIndex && songsToPlay.length > 1);
      setCurrentSong(songsToPlay[randomIndex]);
    } else {
      const nextIndex = (currentIndex + 1) % songsToPlay.length;
      setCurrentSong(songsToPlay[nextIndex]);
    }
  };

  const handlePrevious = () => {
    if (!currentSong) return;

    if (currentTime > 3 && audioRef.current) {
      audioRef.current.currentTime = 0;
      return;
    }

    const songsToPlay = currentPlaylistId
      ? songsLibrary.filter((s) =>
          playlists.find((p) => p.id === currentPlaylistId)?.songIds.includes(s.id)
        )
      : songsLibrary;

    const currentIndex = songsToPlay.findIndex((s) => s.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songsToPlay.length) % songsToPlay.length;
    setCurrentSong(songsToPlay[prevIndex]);
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

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Playlist management
  const handleCreatePlaylist = (name: string, description: string) => {
    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name,
      description,
      songIds: [],
      cover: ["🎵", "🎸", "🎹", "🎤", "🎧", "🎼", "🎺", "🎻"][Math.floor(Math.random() * 8)],
      createdAt: new Date(),
    };
    setPlaylists([...playlists, newPlaylist]);
  };

  const handleDeletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter((p) => p.id !== playlistId));
    if (currentPlaylistId === playlistId) {
      setCurrentPlaylistId(null);
    }
  };

  const handleRenamePlaylist = (playlistId: string, newName: string) => {
    setPlaylists(
      playlists.map((p) => (p.id === playlistId ? { ...p, name: newName } : p))
    );
  };

  const handleAddToPlaylist = (playlistId: string, songId: number) => {
    setPlaylists(
      playlists.map((p) => {
        if (p.id === playlistId && !p.songIds.includes(songId)) {
          return { ...p, songIds: [...p.songIds, songId] };
        }
        return p;
      })
    );
  };

  const handleRemoveFromPlaylist = (playlistId: string, songId: number) => {
    setPlaylists(
      playlists.map((p) => {
        if (p.id === playlistId) {
          return { ...p, songIds: p.songIds.filter((id) => id !== songId) };
        }
        return p;
      })
    );
  };

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song);
  };

  const currentPlaylist = playlists.find((p) => p.id === currentPlaylistId);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden p-2 gap-2">
        {/* Sidebar */}
        <div className="w-80 flex-shrink-0 overflow-y-auto">
          <PlaylistSidebar
            playlists={playlists}
            currentPlaylistId={currentPlaylistId}
            onSelectPlaylist={setCurrentPlaylistId}
            onCreatePlaylist={handleCreatePlaylist}
            onDeletePlaylist={handleDeletePlaylist}
            onRenamePlaylist={handleRenamePlaylist}
          />
        </div>

        {/* Main View */}
        <div className="flex-1 bg-black/40 backdrop-blur-lg rounded-2xl border border-white/10 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search Bar */}
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

            {/* Content */}
            {currentPlaylist ? (
              <PlaylistView
                playlist={currentPlaylist}
                songs={songsLibrary}
                currentSongId={currentSong?.id || null}
                isPlaying={isPlaying}
                onPlaySong={handlePlaySong}
                onRemoveFromPlaylist={handleRemoveFromPlaylist}
              />
            ) : (
              <SongLibrary
                songs={filteredSongs}
                playlists={playlists}
                currentSongId={currentSong?.id || null}
                isPlaying={isPlaying}
                onPlaySong={handlePlaySong}
                onAddToPlaylist={handleAddToPlaylist}
              />
            )}
          </div>
        </div>
      </div>

      {/* Player Controls - Fixed at Bottom */}
      <div className="bg-black/90 backdrop-blur-lg border-t border-white/10 p-4">
        <div className="max-w-screen-2xl mx-auto">
          {/* Now Playing Info + Controls + Volume */}
          <div className="flex items-center gap-4">
            {/* Current Song Info */}
            <div className="flex items-center gap-3 w-80">
              {currentSong ? (
                <>
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    {currentSong.cover}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold truncate">
                      {currentSong.title}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">{currentSong.artist}</p>
                  </div>
                </>
              ) : (
                <div className="text-gray-500 text-sm">No song playing</div>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 flex flex-col items-center gap-2">
              {/* Buttons */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsShuffle(!isShuffle)}
                  className={`transition-all ${
                    isShuffle ? "text-purple-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Shuffle className="w-4 h-4" />
                </button>

                <button
                  onClick={handlePrevious}
                  disabled={!currentSong}
                  className="text-gray-400 hover:text-white transition-all disabled:opacity-30"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={togglePlay}
                  disabled={!currentSong}
                  className="p-2 bg-white rounded-full hover:scale-105 transition-all disabled:opacity-30 disabled:hover:scale-100"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 text-black" fill="black" />
                  ) : (
                    <Play className="w-5 h-5 text-black" fill="black" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  disabled={!currentSong}
                  className="text-gray-400 hover:text-white transition-all disabled:opacity-30"
                >
                  <SkipForward className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    const modes: Array<"off" | "all" | "one"> = ["off", "all", "one"];
                    const currentIndex = modes.indexOf(repeatMode);
                    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
                  }}
                  className={`transition-all relative ${
                    repeatMode !== "off" ? "text-purple-400" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <Repeat className="w-4 h-4" />
                  {repeatMode === "one" && (
                    <span className="absolute -top-1 -right-1 text-[10px] font-bold">1</span>
                  )}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-2xl flex items-center gap-2">
                <span className="text-xs text-gray-400 w-10 text-right">
                  {formatTime(currentTime)}
                </span>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={currentTime}
                  onChange={handleSeek}
                  disabled={!currentSong}
                  className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
                  style={{
                    background: currentSong
                      ? `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                          (currentTime / duration) * 100
                        }%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                      : "#374151",
                  }}
                />
                <span className="text-xs text-gray-400 w-10">
                  {formatTime(duration)}
                </span>
              </div>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-2 w-80 justify-end">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-gray-400 hover:text-white transition-colors"
              >
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
                className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${
                    (isMuted ? 0 : volume) * 100
                  }%, #374151 ${(isMuted ? 0 : volume) * 100}%, #374151 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      {currentSong && (
        <audio
          ref={audioRef}
          src={currentSong.audioUrl}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      )}
    </div>
  );
}
