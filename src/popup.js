import { RESOLUTIONS } from './resolutions.js'

const container = document.getElementById('resolutions')
const captureBtn = document.getElementById('capture')
const status = document.getElementById('status')

// Build resolution checkboxes
Object.entries(RESOLUTIONS).forEach(([id, res]) => {
    const label = document.createElement('label')
    label.innerHTML = `
    <input type="checkbox" name="res" value="${id}" checked>
    <div class="info">
      <div>
        <div class="name">${res.label}</div>
        <div class="use">${res.use}</div>
      </div>
      <div class="dims">${res.width}x${res.height}</div>
    </div>
  `
    container.appendChild(label)
})

// Capture handler
captureBtn.addEventListener('click', async () => {
    const selected = [...document.querySelectorAll('input[name="res"]:checked')]
        .map(el => el.value)

    if (!selected.length) {
        status.textContent = 'Select at least one resolution'
        return
    }

    captureBtn.disabled = true
    status.textContent = 'Capturing...'

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
        const response = await chrome.runtime.sendMessage({
            action: 'capture',
            tabId: tab.id,
            resolutions: selected
        })

        if (response?.success) {
            status.textContent = `Done! ${response.count} screenshots captured`
        } else {
            status.textContent = response?.error || 'Capture failed'
        }
    } catch (err) {
        status.textContent = 'Error: ' + err.message
    }

    captureBtn.disabled = false
})
