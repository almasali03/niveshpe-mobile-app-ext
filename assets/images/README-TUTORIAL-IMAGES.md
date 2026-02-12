# Tutorial Person Images

This directory needs the following images for the video tutorials section:

## Required Images

1. **tutorial-person-1.jpg** - For "How to withdraw your money?" tutorial
2. **tutorial-person-2.jpg** - For "How does this SIP work?" tutorial
3. **tutorial-person-3.jpg** - For "Understanding your returns" tutorial

## Image Specifications

- **Size**: 280px width × 200px height (minimum)
- **Format**: JPG or WebP (recommended for smaller file size)
- **Quality**: High quality (80-90%)
- **Style**: Professional, friendly presenter on clean background
- **Composition**: Person should be positioned at top of image (will show at bottom of card)

## Fallback Behavior

If images are not available, the cards will display:
- Card 1: Purple gradient background
- Card 2: Pink gradient background
- Card 3: Blue gradient background

The `onerror` handler in the HTML automatically applies these gradient backgrounds if the images fail to load.

## Adding Images

Simply add the three JPG files to this directory:
```
/assets/images/tutorial-person-1.jpg
/assets/images/tutorial-person-2.jpg
/assets/images/tutorial-person-3.jpg
```

No code changes needed - the images will automatically display once added.
