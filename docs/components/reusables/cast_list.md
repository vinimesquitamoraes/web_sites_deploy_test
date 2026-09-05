---
type: 'Page'
title: cast_list
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Displays a showcase list or tabbed view of characters with portrait navigation and transition support.

## Imported Components

- CharacterCard (`./character_card.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- imgNintenPortrait (`@/assets/img/characters/ninten_head_sprite.png`)
- imgNinten (`@/assets/img/characters/ninten.png`)
- imgLloydPortrait (`@/assets/img/characters/lloyd_head_sprite.png`)
- imgLloyd (`@/assets/img/characters/lloyd.png`)
- imgAnaPortrait (`@/assets/img/characters/ana_head_sprite.png`)
- imgAna (`@/assets/img/characters/ana.png`)
- imgTeddyPortrait (`@/assets/img/characters/teddy_head_sprite.png`)
- imgTeddy (`@/assets/img/characters/teddy.png`)
- svgTriangle (`@/assets/svg/triangle-right-12-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `viewType` | string | `'list'` | list, tab | Layout display mode for characters. |
| `transitionType` | string | `'fade'` | - | Animation transition type used when switching tabs. |

## Computed Properties & Methods

- `computedTransition`: * @file        cast_list.vue
- `triangleUrl`: * Formats the triangle SVG path for CSS mask usage.
- `characters`: * Reactive collection of game characters with localized text and assets.

## Slots

- *None specified*

## Internal Methods

- *None specified*
