---
type: 'Page'
title: music_player_playlist
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Music player playlist component displaying paginated track listings, current track states, loading indicators, and pagination navigation controls.

## Imported Components

- SocialMediaButton (`@/components/reusables/social_media_button.vue`)
- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- previous_icon (`@/assets/svg/triangle-left-12-filled.svg`)
- next_icon (`@/assets/svg/triangle-right-12-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isLoadingTracks` | boolean | `false` | - | Indicates whether the track list is currently in a loading state. |
| `paginatedTracks` | array | `[]` | - | Array of tracks to display for the current page view. |
| `currentTrackIndex` | number | `-1` | - | Index of the track that is currently playing globally. |
| `currentPage` | number | `1` | - | The current active pagination page number. |
| `totalPages` | number | `1` | - | Total number of available pages. |
| `getGlobalIndex` | func | `''` | - | Helper function to calculate the global track index from a local page index. |
| `pageSize` | number | `7` | - | Number of items to display per page, controlling container height dynamically. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- *None specified*
