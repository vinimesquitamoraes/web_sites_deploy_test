---
type: 'Page'
title: tooltip
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A customizable tooltip component supporting multiple positions, transition durations, and custom styling.

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- tooltipArrow (`@/assets/svg/triangle-down-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `show` | boolean | `false` | - | Controls whether the tooltip is visible. |
| `text` | string | `''` | - | Text content displayed inside the tooltip when slot is empty. |
| `position` | string | `'top'` | top, bottom, left, right | Position of the tooltip relative to the target element ('top', 'bottom', 'left', 'right'). |
| `duration` | number | `300` | - | Transition animation duration in milliseconds. |
| `backgroundColor` | string | `'#ffffff'` | - | Background color of the tooltip container. |
| `borderColor` | string | `'#000000'` | - | Border color of the tooltip container. |
| `borderWidth` | string | `'3px'` | - | Border width of the tooltip container. |
| `textColor` | string | `'var(--color-primary)'` | - | Text color of the tooltip. |

## Computed Properties & Methods

- *None specified*

## Slots

- `default`: Custom implementation.

## Internal Methods

- *None specified*
