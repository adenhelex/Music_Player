# Music Player 🎵

Hey! This is a music playlist app I built inspired by Spotify. You can search for songs, create playlists, and actually play music - not just mock data, real audio playback!

## What it does

So basically, you get a nice dark-themed music player where you can:
- Search through a library of 20 songs (I added different genres to make it interesting)
- Create as many playlists as you want
- Add and remove songs from playlists
- Actually play the music with full controls - play, pause, skip, shuffle, all that good stuff
- Everything saves automatically in your browser, so your playlists stick around

## Quick start

First, clone it and install dependencies:

```bash
git clone https://github.com/adenhelex/Music_Player.git
cd Music_Player
npm install
```

Then just run it:

```bash
npm run dev
```

Open http://localhost:3001 (or whatever port it tells you) and you're good to go!

## How to use it

### Playing songs
Just browse the library and click the play button on any song. Pretty straightforward. The player controls are at the bottom - you can skip tracks, shuffle, repeat, adjust volume, etc.

### Making playlists
See that + button in the sidebar? Click it, give your playlist a name (and description if you want), and boom - new playlist. Each one gets a random emoji as its icon which I thought was fun.

### Adding songs to playlists
Hover over any song and you'll see a + button pop up. Click that and pick which playlist you want to add it to. The menu will show you which playlists already have that song so you don't accidentally add it twice.

### Managing playlists
Click any playlist in the sidebar to see what's in it. You can:
- Remove songs (hover and hit the trash icon)
- Rename the playlist (click the edit icon)
- Delete the whole thing (red trash icon)

### Searching
There's a search bar at the top. Just start typing and it'll filter songs by title, artist, album, or genre in real-time. Pretty handy when you're looking for something specific.

## The tech stack

Built this with:
- Next.js 15 and React 19
- TypeScript (because types are helpful)
- Tailwind CSS for styling
- Lucide icons (they look nice)
- Plain old localStorage for saving playlists

## Project structure

```
components/
  ├── MusicPlayer.tsx      # main component, has all the state
  ├── SearchBar.tsx        # search box
  ├── SongLibrary.tsx      # shows all songs
  ├── PlaylistSidebar.tsx  # left sidebar with playlists
  └── PlaylistView.tsx     # what you see when viewing a playlist

lib/
  └── songsData.ts         # the 20 songs and their info

app/
  ├── page.tsx             # home page
  ├── layout.tsx           # app layout
  └── globals.css          # global styles
```

## Design choices

I went with a dark theme because, well, Spotify does it and it looks good for music apps. Used purple and blue gradients because they're easy on the eyes. Added hover effects and transitions everywhere to make it feel smooth and responsive.

The layout is pretty standard - sidebar on the left for playlists, main area for songs, and the player stuck to the bottom so it's always accessible.

## Adding more songs

If you want to add songs, edit `lib/songsData.ts`. Just follow the same format:

```typescript
{
  id: 21,
  title: "Song Name",
  artist: "Artist Name",
  album: "Album Name",
  duration: "3:45",
  cover: "🎵",
  audioUrl: "your-audio-url.mp3",
  genre: "Genre",
}
```

The audio URLs I'm using are from SoundHelix (free demo tracks), but you can swap them for whatever.

## Stuff to know

- Your playlists save to localStorage, so they'll be there when you come back
- If you clear your browser data, your playlists go poof
- Works best on Chrome or Firefox
- Need a decent internet connection since the audio streams online

## Things I might add later

- Drag and drop to reorder songs
- Export/import playlists
- Custom album art
- Keyboard shortcuts
- Lyrics maybe?
- Better mobile support

## Known quirks

- Audio files are demo tracks from SoundHelix, so they're all instrumental
- No cloud storage, everything's local
- Can't share playlists with other people (yet)
- Playlist size limited by browser storage (but that's pretty big)

## License

MIT - do whatever you want with it.

## About

Made this as a portfolio project. Wanted to build something fun and functional that shows I can handle complex React state and create a nice UI.

If you find any bugs or have suggestions, feel free to open an issue!

---

Built with Next.js and way too much coffee ☕
