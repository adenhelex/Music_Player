"use client";

import { Plus, Music2, Trash2, Edit2, Check, X } from "lucide-react";
import { Playlist } from "@/lib/songsData";
import { useState } from "react";

interface PlaylistSidebarProps {
  playlists: Playlist[];
  currentPlaylistId: string | null;
  onSelectPlaylist: (playlistId: string | null) => void;
  onCreatePlaylist: (name: string, description: string) => void;
  onDeletePlaylist: (playlistId: string) => void;
  onRenamePlaylist: (playlistId: string, newName: string) => void;
}

export default function PlaylistSidebar({
  playlists,
  currentPlaylistId,
  onSelectPlaylist,
  onCreatePlaylist,
  onDeletePlaylist,
  onRenamePlaylist,
}: PlaylistSidebarProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [newPlaylistDescription, setNewPlaylistDescription] = useState("");
  const [editingPlaylistId, setEditingPlaylistId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      onCreatePlaylist(newPlaylistName, newPlaylistDescription);
      setNewPlaylistName("");
      setNewPlaylistDescription("");
      setShowCreateForm(false);
    }
  };

  const handleRename = (playlistId: string) => {
    if (editingName.trim()) {
      onRenamePlaylist(playlistId, editingName);
      setEditingPlaylistId(null);
      setEditingName("");
    }
  };

  const startEditing = (playlist: Playlist) => {
    setEditingPlaylistId(playlist.id);
    setEditingName(playlist.name);
  };

  return (
    <div className="bg-black/40 backdrop-blur-lg rounded-2xl p-4 border border-white/10 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Music2 className="w-5 h-5" />
          Your Playlists
        </h2>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="p-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-all"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {showCreateForm && (
        <div className="mb-4 p-4 bg-white/5 rounded-lg border border-white/10 space-y-3">
          <input
            type="text"
            placeholder="Playlist name"
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            autoFocus
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newPlaylistDescription}
            onChange={(e) => setNewPlaylistDescription(e.target.value)}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCreatePlaylist}
              className="flex-1 px-4 py-2 bg-purple-600 rounded-lg text-white hover:bg-purple-700 transition-all text-sm font-medium"
            >
              Create
            </button>
            <button
              onClick={() => {
                setShowCreateForm(false);
                setNewPlaylistName("");
                setNewPlaylistDescription("");
              }}
              className="flex-1 px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* All Songs Option */}
      <button
        onClick={() => onSelectPlaylist(null)}
        className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all mb-2 ${
          currentPlaylistId === null
            ? "bg-purple-600 text-white"
            : "bg-white/5 text-gray-300 hover:bg-white/10"
        }`}
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-xl">
          🎵
        </div>
        <div className="flex-1 text-left">
          <p className="font-semibold">All Songs</p>
          <p className="text-xs opacity-70">Browse library</p>
        </div>
      </button>

      {/* Playlists */}
      <div className="space-y-2 max-h-[calc(100vh-400px)] overflow-y-auto">
        {playlists.map((playlist) => (
          <div
            key={playlist.id}
            className={`group p-3 rounded-lg transition-all ${
              currentPlaylistId === playlist.id
                ? "bg-purple-600 text-white"
                : "bg-white/5 text-gray-300 hover:bg-white/10"
            }`}
          >
            {editingPlaylistId === playlist.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  autoFocus
                  onKeyPress={(e) => e.key === "Enter" && handleRename(playlist.id)}
                />
                <button
                  onClick={() => handleRename(playlist.id)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Check className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setEditingPlaylistId(null);
                    setEditingName("");
                  }}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onSelectPlaylist(playlist.id)}
                  className="flex-1 flex items-center gap-3 text-left"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    {playlist.cover}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{playlist.name}</p>
                    <p className="text-xs opacity-70 truncate">
                      {playlist.songIds.length} song{playlist.songIds.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                </button>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => startEditing(playlist)}
                    className="p-1.5 hover:bg-white/10 rounded transition-all"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeletePlaylist(playlist.id)}
                    className="p-1.5 hover:bg-red-500/20 rounded transition-all text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {playlists.length === 0 && !showCreateForm && (
        <div className="text-center py-8 text-gray-400">
          <Music2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No playlists yet</p>
          <p className="text-xs mt-1">Create your first playlist!</p>
        </div>
      )}
    </div>
  );
}

