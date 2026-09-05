---
type: 'Page'
title: music_player_volume_control
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Music player volume control component supporting horizontal/vertical layouts, thumbwheels, slider bars, and mute state toggling.

## Imported Components

- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `volumeLayout` | string | `'bar'` | - | Layout style of the volume control (e.g., 'wheel', 'bar'). |
| `volume` | number | `100` | - | Current volume level percentage (0 to 100). |
| `isMuted` | boolean | `false` | - | Indicates whether audio is currently muted. |
| `orientation` | string | `'horizontal'` | horizontal, vertical, horizontal-flipped, vertical-flipped | Orientation and layout direction of the volume control panel. |

## Computed Properties & Methods

- `isCurrentHorizontal`: * @file        music_player_volume_control.vue

## Slots

- *None specified*

## Internal Methods

- *None specified*
