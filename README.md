README.md

# snap

Lightweight browser extension to capture screenshots at multiple content resolutions.
Click → Resize → Screenshot → Gallery with copy/download.

## Quick Start

```bash
npm install
npm run build
```

## Load in Chrome

1. Go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top right)
3. Click **Load unpacked**
4. Select the `dist` folder

## Development

```bash
npm run dev
```

## Content Production Master List (2025 Standards)
content_resolutions = {
    # 1. THE PORTRAIT (4:5 Ratio)
    # Use Case: THE best for LinkedIn and Instagram feed posts. 
    # High engagement because it takes up the most vertical space on mobile.
    "feed-portrait": (1080, 1350, "social-portrait"),

    # 2. THE LANDSCAPE (1.91:1 Ratio)
    # Use Case: Blog headers, Open Graph (OG) images, and Link Previews.
    # When you share a URL on LinkedIn, X, or FB, this is the size they look for.
    "blog-landscape": (1200, 630, "link-preview"),

    # 3. THE VERTICAL (9:16 Ratio)
    # Use Case: Instagram Stories, Reels, TikTok, and YouTube Shorts.
    # Essential for any mobile-first video or full-screen vertical content.
    "mobile-video": (1080, 1920, "vertical-story"),

    # 4. THE SQUARE (1:1 Ratio)
    # Use Case: Universal fallback. Best for Instagram grids and 
    # multi-image "carousel" posts on LinkedIn.
    "universal-square": (1080, 1080, "square-post"),

    # 5. THE THUMBNAIL
    # Use Case: Small preview images for blog lists or sidebars.
    "preview-thumb": (400, 300, "thumbnail")
}