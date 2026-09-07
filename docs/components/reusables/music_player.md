## Overview

Main music player component handling YouTube playback, state management, layouts, and subcomponent coordination.

## Imported Components

- ToasterNotification (`@/components/reusables/notification_toaster.vue`)
- CustomButton (`@/components/reusables/custom_button.vue`)
- PlayerControls (`@/components/reusables/music_player_controls.vue`)
- WalkmanDevice (`@/components/reusables/music_player_walkman.vue`)
- PlaylistView (`@/components/reusables/music_player_playlist.vue`)
- VolumeControl (`@/components/reusables/music_player_volume_control.vue`)
- FloatingNotes (`@/components/reusables/music_player_floating_notes.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- musicNoteSvg (`@/assets/svg/music-note-4-svgrepo-com.svg`)
- triangleLeftSvg (`@/assets/svg/triangle-left-12-filled.svg`)
- triangleUpSvg (`@/assets/svg/triangle-up-12-filled.svg`)
- nintenBoppinIcon (`@/assets/img/characters/Ninten_Boppin.gif`)
- ninten67Icon (`@/assets/img/funny/Ninten_67.gif`)
- ferris_special_tape (`@/assets/img/funny/ferris_special_mixtape.png`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `playlistId` | string | `''` | - | The YouTube playlist ID or full playlist URL. |
| `pageSize` | number | `7` | - | The number of tracks to display per page in the playlist view. |
| `footerBehavior` | string | `'center'` | - | Determines how the player reacts when overlapping the page footer. |
| `volumeLayout` | string | `'wheel'` | - | The layout style used for the volume control component. |
| `minimizedBehavior` | string | `'default'` | - | Defines the behavior style when the player is minimized. |
| `orientation` | string | `'horizontal'` | - | Sets the outer layout orientation of the player. |

## Computed Properties & Methods

- `formatTime`: * @file        music_player_2.vue
- `extractPlaylistId`: * Extracts a clean YouTube playlist identifier or URL string.
- `updateFooterPosition`: * Calculates footer overlap and updates player positioning dynamically on scroll.
- `initPlayer`: * Injects the YouTube iframe API script into the document if missing.
- `createPlayer`: * Instantiates the YouTube player object and registers event handlers.
- `startInterval`: * Syncs the player state and asynchronously fetches track metadata titles in batches.
- `stopInterval`: * Clears the active progress tracking interval timer.
- `togglePlay`: * Toggles playback state between playing and paused.
- `stopPlayer`: * Stops playback completely and resets current seek positions.
- `changeTrack`: * Changes to the next or previous track in the playlist index.
- `playTrack`: * Jumps to and plays a specific track index within the playlist.
- `onSeek`: * Seeks playback to a specific timestamp based on input events.
- `onVolumeChange`: * Updates the audio player volume level from slider inputs.
- `onWheelVolume`: * Adjusts volume levels incrementally using mouse scroll wheel delta values.
- `toggleMute`: * Toggles audio muting state and retains previous active volume levels.
- `toggleTapeStyle`: * Toggles tape image display state and special style palette.
- `handleRecClick`: * Handles recording button interactions and triggers secret easter eggs upon threshold hits.
- `handleSpecialTapeUpdate`: * Handles real-time updates when the special tape option changes.
- `onCompactLeave`: * Resets inline element transition styles when closing the compact player button.

## Slots

- *None specified*

## Internal Methods

- *None specified*
