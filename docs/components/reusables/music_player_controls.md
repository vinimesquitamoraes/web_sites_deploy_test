---
type: 'Page'
title: music_player_controls
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Music player control panel component featuring mechanical-style buttons for playback navigation, recording, and state management.

## Imported Components

- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- prevSvg (`@/assets/svg/player-prev.svg`)
- playSvg (`@/assets/svg/player-play.svg`)
- pauseSvg (`@/assets/svg/player-pause.svg`)
- stopSvg (`@/assets/svg/player-stop.svg`)
- nextSvg (`@/assets/svg/player-next.svg`)
- recSvg (`@/assets/svg/player-rec.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isPlaying` | boolean | `false` | - | Indicates whether the player is currently active and playing media. |
| `isRecording` | boolean | `false` | - | Indicates whether the player is currently recording. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- *None specified*
