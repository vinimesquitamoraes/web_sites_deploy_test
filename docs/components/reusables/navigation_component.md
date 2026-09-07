## Overview

The primary site navigation bar component containing route links and an optional language dropdown selector.

**Source File:** [navigation_component.vue](../../../src/components/reusables/navigation_component.vue)

## Imported Components

- [CustomLanguageDropdown](custom_lang_dropdown.md)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `isMenuOpen` | boolean | `false` | - | Controls whether the mobile navigation menu overlay is open or closed. |
| `showLanguageDropdown` | boolean | `true` | - | Controls whether the language selection dropdown is visible in the navigation bar. |

## Computed Properties & Methods

- *None specified*

## Slots

- *None specified*

## Internal Methods

- `handleNavClick`: Scrolls the page to the top immediately or smoothly depending on the reduced motion preference.
