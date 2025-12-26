import { defineConfig } from 'vite'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync } from 'fs'

export default defineConfig({
    base: './',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'popup.html'),
                gallery: resolve(__dirname, 'gallery.html'),
                background: resolve(__dirname, 'src/background.js')
            },
            output: {
                entryFileNames: 'src/[name].js',
                chunkFileNames: 'src/[name].js',
                assetFileNames: '[name].[ext]'
            }
        }
    },
    plugins: [
        {
            name: 'copy-extension-files',
            closeBundle() {
                // Copy manifest.json
                copyFileSync('manifest.json', 'dist/manifest.json')

                // Copy icons folder
                if (!existsSync('dist/icons')) {
                    mkdirSync('dist/icons', { recursive: true })
                }
                if (existsSync('icons/icon16.png')) copyFileSync('icons/icon16.png', 'dist/icons/icon16.png')
                if (existsSync('icons/icon48.png')) copyFileSync('icons/icon48.png', 'dist/icons/icon48.png')
                if (existsSync('icons/icon128.png')) copyFileSync('icons/icon128.png', 'dist/icons/icon128.png')
                if (existsSync('icons/icon.svg')) copyFileSync('icons/icon.svg', 'dist/icons/icon.svg')
            }
        }
    ]
})
