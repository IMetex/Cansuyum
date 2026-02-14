import { useEffect, useRef, useState } from 'react'

const SURPRISE_MESSAGES = [
    { emoji: '💎', text: 'Sen benim en değerli Cansuyumsun!' },
    { emoji: '🌙', text: 'Karanlığımı aydınlatan tek ışığımsın' },
    { emoji: '❤️', text: 'Aldığım her nefeste sen varsın' },
]

export default function ScratchCard() {
    const canvasRef = useRef(null)
    const [revealed, setRevealed] = useState(false)
    const [messageIndex] = useState(() => Math.floor(Math.random() * SURPRISE_MESSAGES.length))
    const isDrawing = useRef(false)
    const scratchedPixels = useRef(0)

    const message = SURPRISE_MESSAGES[messageIndex]

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || revealed) return
        const ctx = canvas.getContext('2d')

        const rect = canvas.parentElement.getBoundingClientRect()
        canvas.width = rect.width
        canvas.height = rect.height

        // Rich gradient coating
        const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
        grad.addColorStop(0, '#1a0a2e')
        grad.addColorStop(0.3, '#2d1548')
        grad.addColorStop(0.6, '#3d1a5c')
        grad.addColorStop(1, '#1a0a2e')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        // Sparkle dots
        for (let i = 0; i < 60; i++) {
            const x = Math.random() * canvas.width
            const y = Math.random() * canvas.height
            const r = Math.random() * 1.8 + 0.3
            const alpha = Math.random() * 0.4 + 0.1
            ctx.beginPath()
            ctx.arc(x, y, r, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(196, 181, 253, ${alpha})`
            ctx.fill()
        }

        // Subtle shimmer lines
        for (let i = 0; i < 5; i++) {
            const y = Math.random() * canvas.height
            ctx.beginPath()
            ctx.moveTo(0, y)
            ctx.lineTo(canvas.width, y + (Math.random() - 0.5) * 20)
            ctx.strokeStyle = `rgba(244, 114, 182, ${0.03 + Math.random() * 0.04})`
            ctx.lineWidth = 1
            ctx.stroke()
        }

        // Center text
        ctx.fillStyle = 'rgba(251, 207, 232, 0.5)'
        ctx.font = 'italic 15px "Playfair Display", serif'
        ctx.textAlign = 'center'
        ctx.fillText('✨ Parmağınla kazı ✨', canvas.width / 2, canvas.height / 2 - 8)
        ctx.font = '300 11px "Outfit", sans-serif'
        ctx.fillStyle = 'rgba(196, 181, 253, 0.35)'
        ctx.fillText('sürprizi bul', canvas.width / 2, canvas.height / 2 + 14)

        const totalPixels = canvas.width * canvas.height

        function scratch(x, y) {
            ctx.globalCompositeOperation = 'destination-out'

            // Main scratch circle
            ctx.beginPath()
            ctx.arc(x, y, 26, 0, Math.PI * 2)
            ctx.fill()

            // Soft outer edge
            const gradient = ctx.createRadialGradient(x, y, 22, x, y, 36)
            gradient.addColorStop(0, 'rgba(0,0,0,0.6)')
            gradient.addColorStop(1, 'rgba(0,0,0,0)')
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(x, y, 36, 0, Math.PI * 2)
            ctx.fill()
            ctx.fillStyle = '#000'

            ctx.globalCompositeOperation = 'source-over'
            scratchedPixels.current += 26 * 26 * Math.PI

            if (scratchedPixels.current > totalPixels * 0.35) {
                setRevealed(true)
            }
        }

        function getPos(e) {
            const r = canvas.getBoundingClientRect()
            const x = (e.clientX || e.touches?.[0]?.clientX) - r.left
            const y = (e.clientY || e.touches?.[0]?.clientY) - r.top
            return { x, y }
        }

        function startDraw(e) {
            e.preventDefault()
            isDrawing.current = true
            const { x, y } = getPos(e)
            scratch(x, y)
        }

        function moveDraw(e) {
            e.preventDefault()
            if (!isDrawing.current) return
            const { x, y } = getPos(e)
            scratch(x, y)
        }

        function endDraw() {
            isDrawing.current = false
        }

        canvas.addEventListener('mousedown', startDraw)
        canvas.addEventListener('mousemove', moveDraw)
        canvas.addEventListener('mouseup', endDraw)
        canvas.addEventListener('mouseleave', endDraw)
        canvas.addEventListener('touchstart', startDraw, { passive: false })
        canvas.addEventListener('touchmove', moveDraw, { passive: false })
        canvas.addEventListener('touchend', endDraw)

        return () => {
            canvas.removeEventListener('mousedown', startDraw)
            canvas.removeEventListener('mousemove', moveDraw)
            canvas.removeEventListener('mouseup', endDraw)
            canvas.removeEventListener('mouseleave', endDraw)
            canvas.removeEventListener('touchstart', startDraw)
            canvas.removeEventListener('touchmove', moveDraw)
            canvas.removeEventListener('touchend', endDraw)
        }
    }, [revealed])

    return (
        <section className="scratch-section">
            <div className="scratch-card-wrapper">
                <h2 className="scratch-title">Sürpriz Mesaj 🎁</h2>
                <p className="scratch-subtitle">Kartı kazıyarak sürprizi aç!</p>
                <div className={`scratch-area ${revealed ? 'scratch-revealed' : ''}`}>
                    <div className="scratch-reveal">
                        <div className="scratch-reveal-sparkles">✨</div>
                        <span className="scratch-reveal-emoji">{message.emoji}</span>
                        <p className="scratch-reveal-text">{message.text}</p>
                        <div className="scratch-reveal-hearts">💕</div>
                    </div>
                    <canvas ref={canvasRef} className="scratch-canvas" />
                </div>
            </div>
        </section>
    )
}
