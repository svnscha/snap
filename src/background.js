import { RESOLUTIONS } from './resolutions.js'

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'capture') {
    captureAll(msg.tabId, msg.resolutions).then(sendResponse)
    return true // async response
  }
})

async function captureAll(tabId, resolutionIds) {
  const screenshots = []
  const originalSize = await getWindowSize()

  try {
    for (const id of resolutionIds) {
      const res = RESOLUTIONS[id]

      // Resize window to target resolution
      await resizeWindow(res.width, res.height)
      await delay(500) // Allow reflow

      // Capture visible tab (rate limited to avoid quota errors)
      const dataUrl = await chrome.tabs.captureVisibleTab(null, {
        format: 'png',
        quality: 100
      })

      screenshots.push({
        id,
        ...res,
        dataUrl
      })

      // RATE LIMIT: Chrome enforces MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND quota
      // Exceeding ~2 calls/sec throws: "This request exceeds the MAX_CAPTURE_VISIBLE_TAB_CALLS_PER_SECOND quota."
      // This is a hard Chrome API limit, not configurable. 600ms delay ensures compliance.
      await delay(600)
    }

    // Restore original size
    await resizeWindow(originalSize.width, originalSize.height)

    // Open results gallery
    await openGallery(screenshots)

    return { success: true, count: screenshots.length }
  } catch (err) {
    // Try to restore window
    await resizeWindow(originalSize.width, originalSize.height).catch(() => { })
    return { success: false, error: err.message }
  }
}

async function getWindowSize() {
  const win = await chrome.windows.getCurrent()
  return { width: win.width, height: win.height }
}

async function resizeWindow(width, height) {
  const win = await chrome.windows.getCurrent()
  await chrome.windows.update(win.id, { width, height })
}

function delay(ms) {
  return new Promise(r => setTimeout(r, ms))
}

async function openGallery(screenshots) {
  // Store screenshots in chrome.storage.local
  await chrome.storage.local.set({ screenshots })
  // Open the gallery page
  await chrome.tabs.create({ url: chrome.runtime.getURL('gallery.html') })
}
