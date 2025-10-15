"use client";

import { Play, Trash2, Music } from "lucide-react";
import { Song, Playlist } from "@/lib/songsData";

interface PlaylistViewProps {
  playlist: Playlist;
  songs: Song[];
  currentSongId: number | null;
  isPlaying: boolean;
  onPlaySong: (song: Song) => void;
  onRemoveFromPlaylist: (playlistId: string, songId: number) => void;
}

export default function PlaylistView({
  playlist,
  songs,
  currentSongId,
  isPlaying,
  onPlaySong,
  onRemoveFromPlaylist,
}: PlaylistViewProps) {
  const playlistSongs = songs.filter((song) => playlist.songIds.includes(song.id));

  return (
    <div className="space-y-4">
      {/* Playlist Header */}
      <div className="flex items-end gap-6 p-6 bg-gradient-to-b from-purple-600/30 to-transparent rounded-xl">
        <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center text-6xl shadow-2xl">
          {playlist.cover}
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-400 uppercase font-semibold">Playlist</p>
          <h1 className="text-5xl font-bold text-white mt-2 mb-4">{playlist.name}</h1>
          {playlist.description && (
            <p className="text-gray-300 mb-2">{playlist.description}</p>
          )}
          <p className="text-sm text-gray-400">
            {playlistSongs.length} song{playlistSongs.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Songs List */}
      <div className="space-y-1">
        {playlistSongs.length === 0 ? (
          <div className="text-center py-16">
            <Music className="w-16 h-16 mx-auto mb-4 text-gray-600" />
            <p className="text-gray-400 text-lg">This playlist is empty</p>
            <p className="text-gray-500 text-sm mt-2">
              Add songs from the library to get started
            </p>
          </div>
        ) : (
          playlistSongs.map((song, index) => (
            <div
              key={song.id}
              className={`group flex items-center gap-4 p-3 rounded-lg hover:bg-white/10 transition-all ${
                currentSongId === song.id && isPlaying ? "bg-white/5" : ""
              }`}
            >
              {/* Index */}
              <div className="w-8 text-center">
                <span className="text-gray-400 text-sm group-hover:hidden">
                  {index + 1}
                </span>
                <button
                  onClick={() => onPlaySong(song)}
                  className="hidden group-hover:block"
                >
                  <Play className="w-4 h-4 text-white" fill="white" />
                </button>
              </div>

              {/* Album Cover */}
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                {song.cover}
              </div>

              {/* Song Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold truncate ${
                    currentSongId === song.id ? "text-purple-400" : "text-white"
                  }`}
                >
                  {song.title}
                </h3>
                <p className="text-sm text-gray-400 truncate">{song.artist}</p>
              </div>

              {/* Album */}
              <div className="hidden md:block flex-1 min-w-0">
                <p className="text-sm text-gray-400 truncate">{song.album}</p>
              </div>

              {/* Duration */}
              <span className="text-sm text-gray-400 w-12 text-right">
                {song.duration}
              </span>

              {/* Remove Button */}
              <button
                onClick={() => onRemoveFromPlaylist(playlist.id, song.id)}
                className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-500/20 rounded-lg transition-all text-red-400"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

