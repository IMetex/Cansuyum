import { useEffect, useRef } from 'react'

export default function Constellation() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = 200
        }
        resize()
        window.addEventListener('resize', resize)

        // Create heart constellation points
        function heartShape(t) {
            const x = 16 * Math.pow(Math.sin(t), 3)
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t))
            return { x, y }
        }

        const heartPoints = []
        for (let i = 0; i < 24; i++) {
            const t = (i / 24) * Math.PI * 2
            const { x, y } = heartShape(t)
            heartPoints.push({
                x: canvas.width / 2 + x * 4.5,
                y: canvas.height / 2 + y * 4.5 - 10,
                baseX: x * 4.5,
                baseY: y * 4.5 - 10,
                phase: Math.random() * Math.PI * 2,
                speed: 0.02 + Math.random() * 0.015,
                size: 1.5 + Math.random() * 1.5,
            })
        }

        // Background stars
        const bgStars = Array.from({ length: 40 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.2 + 0.3,
            opacity: Math.random() * 0.4 + 0.1,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02,
        }))

        let drawProgress = 0

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // Recalculate center
            const cx = canvas.width / 2
            const cy = canvas.height / 2

            // Background stars
            bgStars.forEach(star => {
                star.phase += star.speed
                const op = star.opacity * (0.5 + 0.5 * Math.sin(star.phase))
                ctx.globalAlpha = op
                ctx.fillStyle = '#fff'
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fill()
            })

            // Update heart points positions
            heartPoints.forEach(p => {
                p.phase += p.speed
                p.x = cx + p.baseX + Math.sin(p.phase) * 2
                p.y = cy + p.baseY + Math.cos(p.phase) * 1.5
            })

            // Draw connections (progressive reveal)
            drawProgress = Math.min(drawProgress + 0.005, 1)
            const visibleCount = Math.floor(heartPoints.length * drawProgress)

            for (let i = 0; i < visibleCount; i++) {
                const next = (i + 1) % heartPoints.length
                if (next >= visibleCount && drawProgress < 1) continue

                ctx.globalAlpha = 0.15
                ctx.strokeStyle = '#d4a843'
                ctx.lineWidth = 0.8
                ctx.beginPath()
                ctx.moveTo(heartPoints[i].x, heartPoints[i].y)
                ctx.lineTo(heartPoints[next].x, heartPoints[next].y)
                ctx.stroke()

                // Cross connections
                if (i % 3 === 0) {
                    const cross = (i + 8) % heartPoints.length
                    if (cross < visibleCount) {
                        ctx.globalAlpha = 0.06
                        ctx.beginPath()
                        ctx.moveTo(heartPoints[i].x, heartPoints[i].y)
                        ctx.lineTo(heartPoints[cross].x, heartPoints[cross].y)
                        ctx.stroke()
                    }
                }
            }

            // Draw constellation stars
            heartPoints.forEach((p, i) => {
                if (i >= visibleCount) return
                const twinkle = 0.6 + 0.4 * Math.sin(p.phase * 3)

                // Glow
                ctx.globalAlpha = twinkle * 0.2
                ctx.fillStyle = '#fb7185'
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size * 6, 0, Math.PI * 2)
                ctx.fill()

                // Star
                ctx.globalAlpha = twinkle
                ctx.fillStyle = '#fff'
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()
            })

            ctx.globalAlpha = 1
            animId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animId)
        }
    }, [])

    return (
        <section className="constellation-section">
            <div className="constellation-card">
                <h2 className="constellation-title">Yıldızlar Hizalandığında 💫</h2>
                <canvas ref={canvasRef} className="constellation-canvas" />
                <p className="constellation-message">
                    Gökyüzündeki milyarlarca yıldız arasında,<br />
                    kaderimiz bizi birbirimize çekti…
                </p>
            </div>
        </section>
    )
}
