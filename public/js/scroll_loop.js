window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.scroll-column').forEach((column) => {
    const direction = column.dataset.direction || 'up'
    const isUp = direction === 'up'
    const speed = 0.25
    let offset = 0

    const computedStyle = window.getComputedStyle(column)
    const gap = parseFloat(computedStyle.gap) || 16

    const cards = Array.from(column.children)
    if (cards.length === 0) {
      return
    }

    cards.forEach((card) => {
      const clone = card.cloneNode(true)
      clone.removeAttribute('id')
      clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'))
      column.appendChild(clone)
    })

    let totalHeight = 0
    const cardHeights = cards.map((card) => card.offsetHeight)

    if (cardHeights.some((h) => h <= 0)) {
      column.getBoundingClientRect()
      cardHeights.forEach((h, i) => {
        if (h <= 0) cardHeights[i] = cards[i].offsetHeight
      })
      if (cardHeights.some((h) => h <= 0)) {
        console.error('Cannot determine card heights accurately. Animation might be wrong.', column)
      }
    }

    totalHeight = cardHeights.reduce((sum, height) => sum + height + gap, 0)

    if (totalHeight <= 0) return

    if (!isUp) {
      column.style.transform = `translateY(${-totalHeight}px)`
    }

    column.style.transition = 'none'

    const animate = () => {
      offset += speed

      if (offset >= totalHeight) {
        offset %= totalHeight
      }

      let currentTransformY
      if (isUp) {
        currentTransformY = -offset
      } else {
        currentTransformY = -totalHeight + offset
      }

      column.style.transform = `translateY(${currentTransformY}px)`

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  })
})
