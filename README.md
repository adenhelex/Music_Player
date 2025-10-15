# Music Player

Hey there! This is a web-based music player I built using Next.js and TypeScript. It's got all the basic features you'd expect from a music player - play/pause, skip tracks, volume control, shuffle, repeat modes, and a working playlist.

## What it does

Pretty straightforward - it plays music in your browser. You get:
- Play, pause, and skip controls (obviously)
- A progress bar you can actually drag to seek through songs
- Volume slider with a mute button
- Shuffle mode that doesn't just play the same "random" order every time
- Repeat modes: off, repeat all, or repeat one song (for when you're obsessed with that one track)
- A playlist sidebar that shows what's currently playing with a neat animation
- Some gradient backgrounds because why not make it look nice

Works on mobile too, though I mainly tested it on desktop.

## Getting started

Clone this repo, then:

```bash
npm install
npm run dev
```

Head to [http://localhost:3000](http://localhost:3000) and you should see it running.

**Note:** The sample tracks use audio files from soundhelix.com. They're royalty-free test music, so don't expect any bangers - just generic background music for testing.

## Project structure

```
app/
  ├── globals.css          # Tailwind styles and CSS variables
  ├── layout.tsx           # Root layout wrapper
  └── page.tsx             # Main page component

components/
  ├── MusicPlayer.tsx      # The main player logic and UI
  └── Playlist.tsx         # Playlist sidebar component
```

Pretty minimal setup. Everything happens in `MusicPlayer.tsx` - all the audio controls, state management, etc.

## Tech stack

- **Next.js 15** - Using the App Router because it's 2025 and we're modern now
- **TypeScript** - Type safety is nice, even for side projects
- **Tailwind CSS** - For styling without writing actual CSS files
- **Lucide React** - Clean icon library
- **HTML5 Audio** - The built-in `<audio>` element does all the heavy lifting

No fancy state management libraries or anything. Just React hooks and local state.

## Adding your own music

Open `components/MusicPlayer.tsx` and find the `sampleTracks` array (around line 17). Replace it with your own tracks:

```typescript
const sampleTracks: Track[] = [
  {
    id: 1,
    title: "Your Song Name",
    artist: "Artist Name",
    duration: "3:45",
    cover: "🎸", // I used emojis but you could use image URLs
    audioUrl: "/path/to/your/song.mp3", // or a full URL
  },
  // ... more tracks
];
```

For local files, just drop your MP3s in the `public` folder and reference them like `/song.mp3`.

**Heads up:** CORS is a thing. If you're using external audio URLs, make sure they allow cross-origin requests or you'll get errors in the console.

## Customizing the look

The whole thing uses Tailwind, so if you want to change colors or styling:

- Main gradient background → `app/page.tsx` (line 8)
- Player colors → Search for `purple-600` or `blue-600` in `components/MusicPlayer.tsx` and replace with whatever
- Dark mode variables → `app/globals.css` (the `:root` section)

Want to change from purple/blue to like green/teal? Just find-replace the color classes. Tailwind makes it pretty painless.

## Known issues / quirks

- The duration formatting assumes your songs are under an hour. If you're trying to play a 2-hour podcast episode, you might see weird timestamps
- Shuffle doesn't remember what it already played, so you might hear repeats before hearing all songs
- On some browsers, the audio won't autoplay when you switch tracks until you've interacted with the page first (browser security thing, not much I can do about it)
- If you spam the next/prev buttons super fast, the UI might lag a tiny bit

## Building for production

```bash
npm run build
npm start
```

Should work fine. I haven't deployed this anywhere yet but it's just a standard Next.js app so Vercel, Netlify, etc. should all work.

## Contributing

This is just a personal project but if you want to fork it and add features, go for it! Some ideas:
- Add a volume visualizer
- Save playlist state to localStorage
- Add keyboard shortcuts
- Support for playlists/albums beyond just a flat list
- Actual album artwork instead of emojis lol

## License

ISC - do whatever you want with it

---

That's about it. Hope this is useful or at least a decent starting point for your own player. Happy listening! 🎧

