## Overview

Application header component containing the logo, navigation links, and a responsive custom hamburger menu button.

**Source File:** [app_header.vue](../../../src/components/reusables/app_header.vue)

## Imported Components

- [NavigationComponent](navigation_component.md)
- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)
- [img_hamburguer_icon_closed](../../../src/assets/svg/hamburger-button.svg)
- [img_hamburguer_icon_open](../../../src/assets/svg/triangle-down-filled.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `activePage` | string | `'Home'` | - | The currently active navigation page name. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `isMenuOpen`: Tracks whether the mobile hamburger menu is open.
- `toggleMenu`: Toggles the mobile menu open/closed state.
