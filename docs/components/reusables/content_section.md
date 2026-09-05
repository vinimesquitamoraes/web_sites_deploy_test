---
type: 'Page'
title: content_section
aliases: null
description: null
icon: null
createdAt: '2026-09-05T01:16:07.179Z'
lastUpdated: '2026-09-05T01:16:07.179Z'
tags: []
imagemDeCapa: null
---

## Overview

Content section component supporting headings, dynamic body text paragraphs, embedded media, and flexible layouts.

## Imported Components

- MediaModal (`./media_modal.vue`)

## Imported Composables

- *None specified*

## Imported Assets

- *None specified*

## Props

| Prop Name | Type | Default | Possible Values | Description |
| :-------- | :--- | :------ | :-------------- | :---------- |
| `heading` | string | `''` | - | Section heading text content. |
| `text` | string\|array | `() => []` | - | Body text string or an array of text paragraphs. |
| `headerPosition` | string | `'top'` | top, inside | Position of the heading relative to the section content (top, inside). |
| `headingColor` | string | `''` | - | Custom text color for the heading. |
| `headingAlign` | string | `'center'` | left, center, right, justify | Text alignment for the heading (left, center, right, justify). |
| `textColor` | string | `''` | - | Text color applied to text container block. |
| `contentBg` | string | `'transparent'` | - | Background color for the main section wrapper container. |
| `borderRadius` | string | `'0px'` | - | Border radius styling for the section container. |
| `border` | string | `'transparent'` | - | Border styling applied to the main section wrapper. |
| `headerBorder` | string | `'transparent'` | - | Border styling applied to the section header. |
| `textBorder` | string | `'none'` | - | Border styling applied to the text container block. |
| `mediaBorder` | string | `''` | - | Border styling applied around the inner media wrapper. |
| `mediaBorderRadius` | string | `''` | - | Border radius styling applied to the inner media inner media wrapper. |
| `textAlign` | string | `'center'` | left, center, right, justify | Text alignment for paragraphs (left, center, right, justify). |
| `sectionPadding` | string | `'0px'` | - | Inner padding spacing applied to the section container wrapper. |
| `textPadding` | string | `'0px'` | - | Inner padding spacing applied to the text content container block. |
| `mediaSrc` | string | `''` | - | Source URL for the media asset (image or video iframe). |
| `mediaAlt` | string | `''` | - | Alternative description text for the media asset. |
| `mediaCaption` | string | `''` | - | Caption text displayed underneath the media wrapper. |
| `mediaWidth` | string | `'535px'` | - | Custom CSS width for the media wrapper element. |
| `mediaHeight` | string | `'auto'` | - | Custom CSS height for the media display container. |
| `mediaType` | string | `'image'` | image, video, text | Type of media asset to display (image, video, text). |
| `mediaPosition` | string | `'right'` | left, right | Alignment orientation of media relative to text (left, right). |
| `layout` | string | `'horizontal'` | horizontal, vertical | Main structural flow layout configuration (horizontal, vertical). |
| `imageOpenable` | boolean | `true` | - | Controls whether images expand into a modal view on click. |
| `mediaFit` | string | `'contain'` | cover, contain, fill, scale-down | CSS object-fit rule for media images (cover, contain, fill, scale-down). |

## Computed Properties & Methods

- `textParagraphs`: * @file content_section.vue
- `shouldShowHeader`: Evaluates whether the header title should render based on availability of text and heading properties.

## Slots

- `media`: Custom media content slot

## Internal Methods

- `openImageModal`: Intercepts clicks to trigger and display the image expansion modal when valid.
- `closeImageModal`: Closes the image modal view.
