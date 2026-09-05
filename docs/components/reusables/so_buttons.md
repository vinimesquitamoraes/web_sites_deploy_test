---
type: 'Page'
title: so_buttons
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

An operating system platform link/icon button component supporting custom masking, sizing, and clickability states.

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `platform` | string | `''` | - | Target operating system platform identifier (e.g. windows, linux, mac). |
| `size` | number\|string | `48` | - | Dimension size for the platform icon. |
| `color` | string | `'var(--color-operational-system-icons-color)'` | - | Default fill color for the icon. |
| `hoverColor` | string | `'var(--color-operational-system-icons-hover-color)'` | - | Hover state fill color for the icon. |
| `url` | string | `''` | - | Custom override URL for the platform link. |
| `clickable` | boolean\|string | `true` | - | Controls whether the button behaves as an interactive link. |

## Computed Properties & Methods

- `isClickable`: * @file        so_buttons.vue
- `resolvedUrl`: * Resolves final target URL based on props and defaults.
- `iconSize`: * Formats size value into pixel string if numeric.
- `iconMask`: * Computes the SVG icon URL for CSS masking.
- `handleClick`: * Prevents default navigation behavior if the button is marked unclickable.

## Slots

- *None specified*

## Internal Methods

- *None specified*
