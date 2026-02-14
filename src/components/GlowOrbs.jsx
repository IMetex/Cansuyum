import { useEffect, useRef } from 'react'

/**
 * Floating ambient glow orbs that drift slowly across the screen.
 * Creates a magical, dreamy atmosphere.
 */
export default function GlowOrbs() {
    const containerRef = useRef(null)

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const orbs = []
        const colors = [
            'rgba(244, 114, 182, 0.08)',  // rose
            'rgba(167, 139, 250, 0.06)',   // lavender
            'rgba(219, 39, 119, 0.05)',    // deep pink
            'rgba(196, 181, 253, 0.07)',   // light purple
            'rgba(251, 207, 232, 0.05)',   // soft pink
        ]

        for (let i = 0; i < 5; i++) {
            const orb = document.createElement('div')
            const size = 200 + Math.random() * 300
            orb.style.cssText = `
                position: fixed;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: radial-gradient(circle, ${colors[i]}, transparent 70%);
                pointer-events: none;
                filter: blur(40px);
                will-change: transform;
                z-index: 1;
            `
            container.appendChild(orb)
            orbs.push({
                el: orb,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.2,
                size,
            })
        }

        let animId
        function animate() {
            orbs.forEach(o => {
                o.x += o.vx
                o.y += o.vy

                // Bounce off edges gently
                if (o.x < -o.size / 2 || o.x > window.innerWidth) o.vx *= -1
                if (o.y < -o.size / 2 || o.y > window.innerHeight) o.vy *= -1

                o.el.style.transform = `translate(${o.x}px, ${o.y}px)`
            })
            animId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            cancelAnimationFrame(animId)
            orbs.forEach(o => o.el.remove())
        }
    }, [])

    return <div ref={containerRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />
}
