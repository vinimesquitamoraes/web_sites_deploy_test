---
type: 'Page'
title: options_modal
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A modal dialog component that manages and persists toggleable options via sessionStorage with cross-tab sync support.

## Imported Components

- ToggleSwitch (`./toggle_button.vue`)
- CustomButton (`./custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- closeIcon (`@/assets/svg/close-svgrepo-com.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | boolean | `false` | - | Controls the visibility state of the modal externally via v-model. |
| `title` | string | `'Settings / Options'` | - | Header title text displayed inside the modal window. |
| `options` | array | `''` | - | Array of option configuration objects containing keys and labels. |
| `width` | number\|string | `400` | - | Width dimension configuration for the modal panel. |
| `bgColor` | string | `'var(--color-custom-button-background)'` | - | Background color of the modal panel. |
| `hoverBgColor` | string | `'var(--color-custom-button-hover)'` | - | Hover background color configuration (reserved for potential panel states). |
| `activeBgColor` | string | `'var(--color-hover)'` | - | Active background color configuration (reserved for potential panel states). |
| `textColor` | string | `'var(--color-custom-button-text)'` | - | Text color applied inside the modal panel. |

## Computed Properties & Methods

- `widthVal`: * @file        options_modal.vue
- `syncSessionState`: Synchronizes reactive session state with current sessionStorage values. * @private
- `toggleOption`: * Updates option state, persists to sessionStorage, dispatches update events, and emits changes.
- `closeModal`: Closes the modal by updating v-model state. * @private

## Slots

- *None specified*

## Internal Methods

- *None specified*
