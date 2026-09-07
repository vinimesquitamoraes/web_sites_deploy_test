## Overview

Interactive image gallery component supporting automatic rotation, animated GIFs,

**Source File:** [galery_carousel.vue](../../../src/components/reusables/galery_carousel.vue)

## Imported Components

- [MediaModal](media_modal.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_left_arrow](../../../src/assets/svg/triangle-left-12-filled.svg)
- [img_right_arrow](../../../src/assets/svg/triangle-right-12-filled.svg)

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

- `handleTouchStart`: Captures initial touch horizontal coordinate on touch start.
- `handleTouchEnd`: Captures ending touch coordinate on touch end and triggers swipe check.
- `handleSwipe`: Evaluates touch displacement against a threshold to determine swipe direction.
- `captureFirstFrame`: Renders the first frame of an animated GIF onto a canvas and extracts a static data URL.
- `resetTimer`: Restarts the auto-advance timer.
- `nextSlide`: Advances the carousel forward to the next slide.
- `prevSlide`: Navigates the carousel backward to the previous slide.
- `selectSlide`: Explicitly selects a slide index based on user selection or pagination interaction.
- `scrollThumbnails`: Smoothly or instantly scrolls the thumbnail strip container horizontally in a given direction.
- `openModal`: Opens the modal view for a given slide index and locks page scrolling.
- `closeModal`: Closes the modal view and restores page scrolling.
