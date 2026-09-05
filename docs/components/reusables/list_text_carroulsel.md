---
type: 'Page'
title: list_text_carroulsel
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A text list carousel component featuring slides of feature lists, custom pagination indicators, and custom navigation buttons.

## Imported Components

- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- img_left_arrow (`@/assets/svg/triangle-left-12-filled.svg`)
- img_right_arrow (`@/assets/svg/triangle-right-12-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `title` | string | `'GAME FEATURES'` | - | Title header text displayed above the carousel. |
| `features` | array | `[]` | - | Array of feature lists displayed across carousel slides. |

## Computed Properties & Methods

- `nextSlide`: * @file        list_text_carroulsel.vue
- `prevSlide`: * Moves the carousel to the previous slide.
- `goToSlide`: * Directly navigates the carousel to a specific slide index.

## Slots

- *None specified*

## Internal Methods

- *None specified*
