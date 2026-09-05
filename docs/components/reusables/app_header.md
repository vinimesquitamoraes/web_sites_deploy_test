---
type: 'Page'
title: app_header
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Application header component containing the logo, navigation links, and a responsive custom hamburger menu button.

## Imported Components

- NavigationComponent (`./navigation_component.vue`)
- CustomButton (`@/components/reusables/custom_button.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- img_gameLogo (`@/assets/img/logos/Encore_Logo.png`)
- img_hamburguer_icon_closed (`@/assets/svg/hamburger-button.svg`)
- img_hamburguer_icon_open (`@/assets/svg/triangle-down-filled.svg`)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `activePage` | string | `'Home'` | - | The currently active navigation page name. |

## Computed Properties & Methods

- `toggleMenu`: * @file        app_header.vue

## Slots

- *None specified*

## Internal Methods

- *None specified*
