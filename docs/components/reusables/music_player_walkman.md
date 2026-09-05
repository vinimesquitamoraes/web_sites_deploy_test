---
type: 'Page'
title: music_player_walkman
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Walkman-style music player component featuring an LCD screen, track progress scrubber, custom cassette display toggle, and animated tape reels.

## Imported Components

- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isPlaying` | boolean | `false` | - | Indicates whether media is currently playing. |
| `showImageTape` | boolean | `false` | - | Controls whether to display the custom image cassette instead of the default shell. |
| `currentTrackIndex` | number | `0` | - | Index of the currently playing track. |
| `currentTime` | number | `0` | - | Current playback time in seconds. |
| `duration` | number | `0` | - | Total duration of the current track in seconds. |
| `specialTapeImg` | string | `''` | - | Image URL for the special custom tape design. |
| `formatTime` | func | `''` | - | Utility function to format timestamp numbers into displayable time strings. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `checkSessionAccess`: * @file        music_player_walkman.vue
