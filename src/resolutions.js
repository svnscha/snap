// Content resolution presets for 2025 standards
export const RESOLUTIONS = {
    'feed-portrait': {
        width: 1080,
        height: 1350,
        label: 'Portrait 4:5',
        use: 'LinkedIn & Instagram feed'
    },
    'blog-landscape': {
        width: 1200,
        height: 630,
        label: 'Landscape 1.91:1',
        use: 'Blog headers, OG images'
    },
    'mobile-video': {
        width: 1080,
        height: 1920,
        label: 'Vertical 9:16',
        use: 'Stories, Reels, TikTok'
    },
    'universal-square': {
        width: 1080,
        height: 1080,
        label: 'Square 1:1',
        use: 'Instagram grid, carousels'
    },
    'preview-thumb': {
        width: 400,
        height: 300,
        label: 'Thumbnail',
        use: 'Blog previews, sidebars'
    }
}
