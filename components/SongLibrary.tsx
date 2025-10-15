"use client";

import { Play, Plus, MoreVertical } from "lucide-react";
import { Song, Playlist } from "@/lib/songsData";
import { useState } from "react";

interface SongLibraryProps {
  songs: Song[];
  playlists: Playlist[];
  currentSongId: number | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onAddToPlaylist: (playlistId: string, songId: number) => void;
}

export default function SongLibrary({
  songs,
  playlists,
  currentSongId,
  isPlaying,
  onPlaySong,
  onAddToPlaylist,
}: SongLibraryProps) {
  const [showPlaylistMenu, setShowPlaylistMenu] = useState<number | null>(null);

  const handleAddToPlaylist = (playlistId: string, songId: number) => {
    onAddToPlaylist(playlistId, songId);
    setShowPlaylistMenu(null);
  };

  return (
    <div className="space-y-2">
      <h2 className="text-2xl font-bold text-white mb-4">All Songs</h2>
      <div className="space-y-1">
        {songs.map((song) => (
          <div
            key={song.id}
            className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-all ${
              currentSongId === song.id && isPlaying ? "bg-white/5" : ""
            }`}
          >
            {/* Album Cover */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
              {song.cover}
            </div>

            {/* Song Info */}
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold truncate ${
                currentSongId === song.id ? "text-purple-400" : "text-white"
              }`}>
                {song.title}
              </h3>
              <p className="text-sm text-gray-400 truncate">
                {song.artist} • {song.album}
              </p>
            </div>

            {/* Genre */}
            <span className="hidden sm:block px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300">
              {song.genre}
            </span>

            {/* Duration */}
            <span className="text-sm text-gray-400 w-12 text-right">{song.duration}</span>

            {/* Actions */}
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onPlaySong(song)}
                className="p-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-all hover:scale-110"
              >
                <Play className="w-4 h-4 text-white" fill="white" />
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowPlaylistMenu(showPlaylistMenu === song.id ? null : song.id)}
                  className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-all"
                >
                  <Plus className="w-4 h-4 text-white" />
                </button>

                {showPlaylistMenu === song.id && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-white/10 rounded-lg shadow-xl z-50 overflow-hidden">
                    <div className="p-2 border-b border-white/10">
                      <p className="text-xs text-gray-400 px-2">Add to playlist</p>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {playlists.length === 0 ? (
                        <p className="px-4 py-3 text-sm text-gray-400">No playlists yet</p>
                      ) : (
                        playlists.map((playlist) => (
                          <button
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id, song.id)}
                            className="w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 transition-colors flex items-center gap-2"
                            disabled={playlist.songIds.includes(song.id)}
                          >
                            <span className="text-lg">{playlist.cover}</span>
                            <span className={playlist.songIds.includes(song.id) ? "text-gray-500" : ""}>
                              {playlist.name}
                            </span>
                            {playlist.songIds.includes(song.id) && (
                              <span className="ml-auto text-xs text-gray-500">✓</span>
                            )}
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

