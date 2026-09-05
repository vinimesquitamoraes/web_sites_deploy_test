---
type: 'Page'
title: social_media_button
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Reusable social media link button component featuring dynamic SVG icons and a hover tooltip.

## Imported Components

- ToolTip (`@/components/reusables/tooltip.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `platform` | string | `''` | - | The social network platform identifier (e.g. 'twitter', 'discord'). |
| `tooltipText` | string | `null` | - | Custom text string override for the tooltip. |
| `showTooltip` | boolean | `true` | - | Flag indicating whether the tooltip should display. |
| `toolTipPosition` | string | `'top'` | - | Position of the tooltip relative to the icon button. |
| `size` | number\|string | `48` | - | Dimension size value for the icon button width and height. |
| `color` | string | `'var(--color-social-icons-color, inherit)'` | - | Default CSS color string. |
| `hoverColor` | string | `'var(--color-social-icons-hover-color, inherit)'` | - | Hover state CSS color string. |

## Computed Properties & Methods

- `computedTooltipText`: * @file social_media_button.vue
- `cssSize`: Eager glob import map resolving SVG asset files. */
- `cssMask`: Resolved SVG mask URL path computed from platform key.
- `isTooltipVisible`: Internal reactive visibility state toggle flag. */

## Slots

- *None specified*

## Internal Methods

- `handleMouseEnter`: Event handler triggered upon mouse entering the button container area.
- `handleMouseLeave`: Event handler triggered upon mouse leaving the button container area.
