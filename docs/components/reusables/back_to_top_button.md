---
type: 'Page'
title: back_to_top_button
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A floating back-to-top button component with dynamic footer overlap handling and smooth scrolling behavior.

## Imported Components

- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- triangleIcon (`@/assets/svg/triangle-up-12-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `footerBehavior` | string | `'stay'` | center, stay, hide, overlap | Defines how the button behaves when overlapping with the page footer ('center', 'stay', 'hide', 'overlap'). |

## Computed Properties & Methods

- `handleScroll`: * @file        back_to_top_button.vue
- `handleFooterOverlap`: * Computes footer bounding rectangles to adjust position when overlapping the footer.
- `scrollToTop`: * Smoothly scrolls the window back to the top.

## Slots

- *None specified*

## Internal Methods

- *None specified*
