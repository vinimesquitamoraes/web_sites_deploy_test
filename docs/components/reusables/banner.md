## Overview

Hero banner component featuring background image, logo display, dynamically rendered call-to-action buttons via array props, and a secret directional scrolling animation defined via session variable.

**Source File:** [banner.vue](../../../src/components/reusables/banner.vue)

## Imported Components

- [CustomButton](custom_button.md)

## Imported Composables

- *None specified*

## Imported Assets

- [img_gameLogo](../../../src/assets/img/logos/Encore_Logo.png)
- [img_defaultBanner](../../../src/assets/img/art/web_site_banner.png)
- [charactersImage](../../../src/assets/img/art/ninten_and_lloyd.jpg)
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
| `showCtaButton` | boolean | `true` | - | Controls whether the call-to-action button elements are visible. |
| `buttons` | array | `[   {     text        : 'Download',     to          : '/download',     iconSrc     : dowload_icon,     emit        : 'cta-click'   },   {     text        : 'Read the latest news',     externalUrl : 'https://mother-encore.itch.io/mother-encore/devlog',     emit        : 'news-click',     fontSize    : 'var(--font-pp-size)',     bgColor     : 'var(--color-black)',     textColor   : 'var(--color-default-text-color)',   } ]` | - | Array of button configuration objects for dynamic rendering. |
| `vignetteStyle` | string | `'style_1'` | style_1, style_2, style_3, style_4 | Predefined vignette style key or custom CSS background value. |
| `allowDrag` | boolean | `true` | - | Toggles image drag functionality on the banner logo. |
| `allowSaveAs` | boolean | `false` | - | Controls whether the right-click context menu ("Save image as...") is allowed on the logo. |
| `disableSelect` | boolean | `true` | - | Disables text and element selection on the banner logo. |

## Computed Properties & Methods

- `userSelectValue`: Computed CSS user-select property value based on selection protection configuration.
- `activeImageSrc`: Computed property that resolves the current background image URL.
- `isScrollableActive`: Computed property to determine if the background scroll animation is active.
- `activeScrollDirection`: Computed property that resolves the current active scroll direction style.
- `resolvedVignette`: Computed property to map the vignetteStyle prop key to a style string, or fallback to raw CSS.
- `cssVignetteBackground`: Resolved vignette background style computed from resolvedVignette.

## Slots

- `content`: Docstrings Missing.

## Internal Methods

- `getRandomAlternative`: Selects a random alternative background image from the configured array.
- `handleContextMenu`: Handles right-click events according to the `allowSaveAs` property configuration.
- `checkSessionState`: Checks and updates the active session state based on session storage value changes.
- `handleStorageChange`: Event listener handler for window storage updates across windows/tabs.
