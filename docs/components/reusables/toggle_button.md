---
type: 'Page'
title: toggle_button
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A customizable switch toggle component supporting active/inactive icons, masked colorization, and custom dimensions.

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | boolean | `false` | - | Binds the switch checked state externally via v-model. |
| `iconSrc` | string | `''` | - | Default source URL or SVG string for the icon. |
| `activeIconSrc` | string | `''` | - | Icon source used specifically when the toggle is active. |
| `inactiveIconSrc` | string | `''` | - | Icon source used specifically when the toggle is inactive. |
| `iconSize` | number\|string | `24` | - | Width and height dimension for the icon. |
| `iconColor` | string | `'#ffffff'` | - | Fill color for CSS mask-based switch icons. |
| `handleBgColor` | string | `'var(--color-black)'` | - | Background color of the internal draggable/sliding handle. |
| `width` | number\|string | `80` | - | Width dimension applied to the slider track. |
| `height` | number\|string | `44` | - | Height dimension applied to the slider track. |
| `bgColor` | string | `'var(--color-custom-button-background)'` | - | Background color of the slider in default inactive state. |
| `hoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Background color of the slider when hovered. |
| `activeBgColor` | string | `'var(--color-hover)'` | - | Background color of the slider when active. |

## Computed Properties & Methods

- `cssWidth`: Computed width style for the slider track.
- `cssHeight`: Computed height style for the slider track.
- `cssSliderBg`: Computed dynamic background color for the slider depending on state.
- `handleSizeValue`: Computed size for the handle based on slider height.
- `cssHandleSize`: Computed width/height style for the handle element.
- `cssIconSize`: Computed size style for the icon element.
- `rawIcon`: Computed raw icon string depending on active/inactive states. * @private
- `processedIcon`: Processes raw SVG strings into data URIs or passes through image paths. * @private
- `cssMaskImage`: Computed CSS mask URL for SVG icons. * @private
- `handleClick`: * Handles the click action to toggle states and emit events.

## Slots

- *None specified*

## Internal Methods

- `formatValue`: * @file        toggle_button.vue
