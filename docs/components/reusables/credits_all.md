---
type: 'Page'
title: credits_all
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

The master credits container component that parses CSV files for roles and links, formatting localized credit lists for display.

## Imported Components

- CreditsComponent (`@/components/reusables/credits_section.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- rolesCSVText (`@/assets/csv/credits_roles.csv?raw`)
- linksCSVText (`@/assets/csv/credits_links.csv?raw`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `act` | string | `'all'` | - | The act filter string ('all' or specific act number). |

## Computed Properties & Methods

- `debugLog`: * @file        credits_all.vue
- `specialCredits`: The act filter string ('all' or specific act number). */
- `playerThanks`: * Optional player thank you block configuration.
- `parseCSV`: * Parses raw CSV text into structured JavaScript objects.
- `linksMap`: * Generates a lookup dictionary mapping names to external links from the parsed links CSV.
- `formattedCredits`: * Formats the raw CSV role data and links into structured credit groups based on the active act filter.

## Slots

- *None specified*

## Internal Methods

- *None specified*
