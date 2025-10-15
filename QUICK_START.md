# Quick Start Guide

**Music Player** by Sikarin Kaewjutaniti - A Spotify-inspired playlist application

## Getting it running

Just do this:

```bash
npm run dev
```

Then open http://localhost:3001 in your browser. That's it!

## Main stuff you can do

### Browse and search songs

When you first open it, you'll see all 20 songs in the library. There's a search bar at the top - type anything and it'll filter the songs instantly. Works on song titles, artists, albums, even genres.

Click the play button on any song to start listening.

### Create a playlist

See that + button in the left sidebar? Click it, type a name for your playlist, maybe add a description if you're feeling detailed, then hit Create. Done.

### Add songs to your playlist

This is pretty easy:
1. Hover over any song
2. Click the + button that shows up
3. Pick which playlist you want
4. That's it

You'll see a checkmark next to playlists that already have that song, so you don't add it twice.

### View and edit playlists

Click any playlist in the sidebar to open it. From there you can:
- Remove songs you don't want anymore (trash icon)
- Rename the playlist (edit icon, then just type and hit enter)
- Delete the whole playlist (red trash icon - careful with this one)

### Use the player

Bottom of the screen has all your controls:

**Playback stuff:**
- Play/pause button (big white circle)
- Previous/next track buttons
- Progress bar (click anywhere to jump to that spot)

**Special modes:**
- Shuffle (randomizes the order)
- Repeat (cycles through off → repeat all → repeat one)

**Audio:**
- Volume slider on the right
- Speaker icon to mute/unmute

## Tips

Some things I learned while building this:

- Click "All Songs" in the sidebar to go back to the full library
- Each playlist gets a random emoji icon (just for fun)
- Search is smart - it looks at everything about a song
- Can't add the same song to a playlist twice (it won't let you)
- Purple color means something is active or currently playing

## If something's not working

**No sound?**
- Check your browser isn't muted
- Make sure you have internet (songs stream online)
- Try a different song

**Playlists disappeared?**
- Were you in incognito mode? (doesn't save there)
- Did you clear browser data? (that deletes playlists)
- Make sure you're on the same browser/computer

**Search seems broken?**
- Make sure you're on "All Songs" view, not inside a playlist
- Try clearing the search box
- Refresh the page

**Looks weird?**
- Check your zoom is at 100%
- Try making the browser window bigger
- Refresh might help

## About the songs

I included 20 songs across different genres:
- Electronic, Pop, Hip Hop, Rock
- Jazz, Classical, Ambient, Indie
- Latin, Folk, R&B, World, Dance, Chill

They're all demo tracks from SoundHelix (free audio library), so they work but they're instrumental.

## Browser stuff

Works on basically any modern browser. Chrome and Firefox are probably best. Safari and Edge work too.

Just need JavaScript enabled and localStorage working (which is default anyway).

## Data storage

Your playlists save automatically to your browser's localStorage. That means:
- They stick around when you close the browser
- They're only on your computer (not in the cloud)
- Clearing browser data will delete them
- Can't access them from a different computer

If you want to inspect the data, open browser DevTools → Application → Local Storage → look for "musicPlaylists"

## Need more help?

Check out README.md for way more details about features, customization, and how everything works under the hood.

---

Enjoy! 🎧
