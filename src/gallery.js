let screenshots = []

async function init() {
    const result = await chrome.storage.local.get('screenshots')
    screenshots = result.screenshots || []

    const grid = document.getElementById('grid')

    if (!screenshots.length) {
        grid.innerHTML = '<div class="empty">No screenshots captured yet</div>'
        return
    }

    grid.innerHTML = screenshots.map(s => `
        <div class="card">
            <div class="preview">
                <img src="${s.dataUrl}" alt="${s.label}">
            </div>
            <div class="meta">
                <h3>${s.label}</h3>
                <p>${s.width}x${s.height} - ${s.use}</p>
            </div>
            <div class="actions">
                <button data-action="copy" data-id="${s.id}">Copy</button>
                <button data-action="download" data-id="${s.id}" data-label="${s.label}">Download</button>
            </div>
        </div>
    `).join('')

    // Event delegation for card buttons
    grid.addEventListener('click', handleGridClick)
}

async function handleGridClick(e) {
    const btn = e.target.closest('button')
    if (!btn) return

    const action = btn.dataset.action
    const id = btn.dataset.id

    if (action === 'copy') {
        await copyImage(id)
    } else if (action === 'download') {
        await downloadImage(id, btn.dataset.label)
    }
}

async function copyImage(id) {
    const item = screenshots.find(d => d.id === id)
    if (!item) return
    try {
        const blob = await fetch(item.dataUrl).then(r => r.blob())
        await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })])
    } catch (err) {
        alert('Failed to copy: ' + err.message)
    }
}

async function downloadImage(id, label) {
    const item = screenshots.find(d => d.id === id)
    if (!item) return
    // Convert data URL to blob for reliable download
    const response = await fetch(item.dataUrl)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = label.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.png'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

function downloadAll() {
    screenshots.forEach((item, i) => {
        setTimeout(() => downloadImage(item.id, item.label), i * 300)
    })
}

// Download All button listener
document.getElementById('download-all').addEventListener('click', downloadAll)

init()
