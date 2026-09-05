---
type: 'Page'
title: music_player
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

No description provided.

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
- nintenBoppinIcon (`@/assets/img/characters/Ninten_Boppin.gif`)
- ninten67Icon (`@/assets/img/funny/Ninten_67.gif`)
- ferris_special_tape (`@/assets/img/funny/ferris_special_mixtape.png`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `playlistId` | string | `''` | - | - |
| `pageSize` | number | `7` | - | - |
| `footerBehavior` | string | `'center'` | - | - |
| `volumeLayout` | string | `'wheel'` | - | - |
| `minimizedBehavior` | string | `'default'` | - | - |
| `orientation` | string | `'horizontal'` | - | - |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `formatTime`: Formats track duration seconds using a Builder Pattern
- `extractPlaylistId`: Extracts valid YouTube playlist ID using a Builder Pattern
- `updateFooterPosition`: Calculates footer overlap & positioning via a Builder Pattern
- `onWheelVolume`: Syncs state and fetches track details with bulletproof batching and request retries */
