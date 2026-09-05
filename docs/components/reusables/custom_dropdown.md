---
type: 'Page'
title: custom_dropdown
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A customizable dropdown component supporting v-model selection, click-outside closing behavior, and animated arrow icons.

## Imported Components

- *None specified*

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `modelValue` | string\|number | `''` | - | Current selected value bound via v-model. |
| `options` | array | `[]` | - | List of selectable options containing id and label properties. |

## Computed Properties & Methods

- `selectedLabel`: * @file        custom_dropdown.vue
- `selectOption`: * Handles selection of an option and closes the dropdown.
- `closeDropdown`: * Closes the dropdown if a click event occurs outside of the component.

## Slots

- *None specified*

## Internal Methods

- *None specified*
