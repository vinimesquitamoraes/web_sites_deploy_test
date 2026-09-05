---
type: 'Page'
title: galery_carousel
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Interactive image gallery component supporting automatic rotation, animated GIFs,

## Imported Components

- MediaModal (`./media_modal.vue`)
- CustomButton (`./custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- img_left_arrow (`@/assets/svg/triangle-left-12-filled.svg`)
- img_right_arrow (`@/assets/svg/triangle-right-12-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `intervalTime` | number | `1000` | - | Time in milliseconds before advancing to the next slide. |
| `imageModules` | object | `{}` | - | Object Dictionary esque of imported image/GIF source URLs. |

## Computed Properties & Methods

- `currentModalMediaItem`: Computed property providing the current media/medias for the modal.

## Slots

- *None specified*

## Internal Methods

- `handleTouchStart`: * @file galery_carousel.vue
- `handleTouchEnd`: Captures ending touch coordinate on touch end and triggers swipe check.
- `handleSwipe`: Evaluates touch displacement against a threshold to determine swipe direction.
- `captureFirstFrame`: Renders the first frame of an animated GIF onto a canvas and extracts a static data URL.
- `resetTimer`: Restarts the auto-advance timer.
- `nextSlide`: Advances the carousel forward to the next slide.
- `prevSlide`: Navigates the carousel backward to the previous slide.
- `selectSlide`: Explicitly selects a slide index based on user selection or pagination interaction.
- `scrollThumbnails`: Smoothly scrolls the thumbnail strip container horizontally in a given direction.
- `openModal`: Watches index changes to reset timers and align active thumbnail positions smoothly. */
- `closeModal`: Closes the modal view and restores page scrolling.
