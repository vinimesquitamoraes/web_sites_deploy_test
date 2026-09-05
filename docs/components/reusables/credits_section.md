---
type: 'Page'
title: credits_section
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

A customizable credits section component featuring grouped roles, names, grid layout columns, dynamic links, and tooltip integrations.

## Imported Components

- CustomTooltip (`@/components/reusables/tooltip.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `credits` | array | `''` | - | Array of credit sections containing titles and grouped role lists. |
| `linksMap` | object | `{}` | - | Mapping dictionary matching names to external links. |
| `titleColor` | string | `'var(--color-credits-title)'` | - | Text color for main section titles. |
| `subtitleColor` | string | `'var(--color-credits-role)'` | - | Text color for group roles/subtitles. |
| `textColor` | string | `'var(--color-credits-name)'` | - | Text color for individual names. |
| `columns` | number\|string | `2` | - | Number of grid columns for the names list. |
| `textAlign` | string | `'left'` | - | Text alignment orientation ('left', 'center', 'right'). |

## Computed Properties & Methods

- `computedAlign`: * @file        credits_section.vue
- `resolveName`: Extracts string name from string or object person entries. * @private
- `resolveLink`: Resolves link mapping for a person string. * @private
- `getPersonLink`: Gets specific link or fallback resolved link for a person. * @private
- `isTooltipAllowed`: Determines if tooltips are permitted based on config hierarchy. * @private

## Slots

- *None specified*

## Internal Methods

- *None specified*
