## Overview

Hero banner component featuring background image, logo display and a secret directional scrolling animation defined via session variable.

**Source File:** [banner.vue](../../../src/components/reusables/banner.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)
- [img_defaultBanner](../../../src/assets/img/art/170_sin_titulo_20260909211151.png)
- [dowload_icon](../../../src/assets/svg/download.svg)

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `imageSrc` | string | `''` | - | Default background image source URL. |
| `imageAlt` | string | `'Hero banner background'` | - | Accessibility description text for the background image. |
| `subtitle` | string | `'[Default Banner Text]'` | - | Subtitle tha appears below logo. |
| `isScrollable` | boolean\|string | `false` | - | Determine if scrolling background animations are enabled. |
| `scrollDirection` | string | `'horizontal'` | none, horizontal, vertical, both | Direction trajectory for background scrolling animation. |
| `sessionKey` | string | `''` | - | Browser session storage lookup key for conditional alternative asset displays. |
| `alternativeImages` | array | `[]` | - | List of alternative background images for active session rotation. |
| `alternativeScrollDirection` | string | `'both'` | - | Scroll animation direction when an alternative session state is active. |
| `imageChangeInterval` | number | `12500` | - | Time interval in milliseconds between background image transitions. |
| `showLogo` | boolean | `true` | - | Controls whether the brand logo image container is visible. |
| `showCtaButton` | boolean | `true` | - | Controls whether the call-to-action button element is visible. |
| `ctaText` | string | `''` | - | Custom text label override string for the call-to-action button. |
| `ctaLink` | string | `'/download'` | - | Target routing link destination path for the call-to-action button. |
| `vignetteStyle` | string | `'style_1'` | style_1, style_2, style_3, style_4 | Predefined vignette style key or custom CSS background value. |

## Computed Properties & Methods

- `activeImageSrc`: Computed property that resolves the current background image URL.
- `isScrollableActive`: Computed property to determine if the background scroll animation is active.
- `activeScrollDirection`: Computed property that resolves the current active scroll direction style.
- `resolvedVignette`: Computed property to map the vignetteStyle prop key to a style string, or fallback to raw CSS.
- `cssVignetteBackground`: Resolved vignette background style computed from resolvedVignette.

## Slots

- `media`: Custom content slot

## Internal Methods

- `getRandomAlternative`: Selects a random alternative background image from the configured array.
- `checkSessionState`: Checks and updates the active session state based on session storage value changes.
