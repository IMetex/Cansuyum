import { useEffect, useRef } from 'react'

export default function MouseTrail() {
    const hearts = ['💕', '💗', '✨', '♥', '💖', '🌟']
    const throttle = useRef(0)

    useEffect(() => {
        const handleMove = (e) => {
            const now = Date.now()
            if (now - throttle.current < 90) return
            throttle.current = now

            const x = e.clientX || (e.touches && e.touches[0]?.clientX)
            const y = e.clientY || (e.touches && e.touches[0]?.clientY)
            if (!x || !y) return

            const el = document.createElement('span')
            el.className = 'cursor-heart'
            el.textContent = hearts[Math.floor(Math.random() * hearts.length)]
            el.style.left = x + 'px'
            el.style.top = y + 'px'
            document.body.appendChild(el)
            setTimeout(() => el.remove(), 1200)
        }

        window.addEventListener('mousemove', handleMove)
        window.addEventListener('touchmove', handleMove, { passive: true })
        return () => {
            window.removeEventListener('mousemove', handleMove)
            window.removeEventListener('touchmove', handleMove)
        }
    }, [])

    return null
}
