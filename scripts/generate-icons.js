import sharp from 'sharp'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, '..')
const iconsDir = join(rootDir, 'icons')

const svgBuffer = readFileSync(join(iconsDir, 'icon.svg'))

const sizes = [16, 48, 128]

async function generateIcons() {
    for (const size of sizes) {
        await sharp(svgBuffer)
            .resize(size, size)
            .png()
            .toFile(join(iconsDir, `icon${size}.png`))
        console.log(`Generated icon${size}.png`)
    }
}

generateIcons().catch(console.error)
