import { useEffect, useRef } from 'react'

export default function StarField() {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        let animId
        let mouseX = -100, mouseY = -100

        function resize() {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resize()
        window.addEventListener('resize', resize)

        function onMouse(e) {
            mouseX = e.clientX
            mouseY = e.clientY
        }
        window.addEventListener('mousemove', onMouse)

        // Stars
        class Star {
            constructor() { this.reset() }
            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height
                this.size = Math.random() * 1.8 + 0.3
                this.maxOp = Math.random() * 0.7 + 0.15
                this.speed = Math.random() * 0.012 + 0.003
                this.phase = Math.random() * Math.PI * 2
                const rng = Math.random()
                this.color = rng < 0.35
                    ? `hsl(${330 + Math.random() * 20}, 75%, ${70 + Math.random() * 20}%)`
                    : rng < 0.6
                        ? `hsl(${270 + Math.random() * 25}, 60%, ${65 + Math.random() * 25}%)`
                        : rng < 0.75
                            ? `hsl(${185 + Math.random() * 15}, 70%, ${72 + Math.random() * 18}%)`
                            : `hsl(0, 0%, ${82 + Math.random() * 18}%)`
            }
            update() {
                this.phase += this.speed
                this.opacity = Math.abs(Math.sin(this.phase)) * this.maxOp
                if (this.phase > Math.PI * 6) this.reset()

                // Mouse proximity glow
                const dx = this.x - mouseX
                const dy = this.y - mouseY
                const dist = Math.sqrt(dx * dx + dy * dy)
                if (dist < 120) {
                    this.opacity = Math.min(1, this.opacity + (1 - dist / 120) * 0.5)
                }
            }
            draw() {
                ctx.save()
                ctx.globalAlpha = this.opacity
                ctx.fillStyle = this.color

                // Cross sparkle
                const s = this.size
                ctx.beginPath()
                for (let i = 0; i < 8; i++) {
                    const r = i % 2 === 0 ? s : s * 0.3
                    const a = (Math.PI * i) / 4 - Math.PI / 2
                    ctx.lineTo(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r)
                }
                ctx.closePath()
                ctx.fill()

                // Soft glow
                ctx.globalAlpha = this.opacity * 0.12
                ctx.beginPath()
                ctx.arc(this.x, this.y, s * 5, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }
        }

        // Shooting star
        class ShootingStar {
            constructor() { this.reset() }
            reset() {
                this.x = Math.random() * canvas.width
                this.y = Math.random() * canvas.height * 0.35
                this.length = 70 + Math.random() * 90
                this.speed = 5 + Math.random() * 5
                this.opacity = 0
                this.angle = Math.PI * 0.15 + Math.random() * 0.25
                this.life = 0
                this.maxLife = 50 + Math.random() * 35
                this.active = false
                this.nextSpawn = Math.random() * 400 + 250
                this.timer = 0
            }
            update() {
                if (!this.active) {
                    this.timer++
                    if (this.timer > this.nextSpawn) {
                        this.active = true
                        this.x = Math.random() * canvas.width
                        this.y = Math.random() * canvas.height * 0.3
                        this.timer = 0
                    }
                    return
                }
                this.life++
                this.x += Math.cos(this.angle) * this.speed
                this.y += Math.sin(this.angle) * this.speed
                const p = this.life / this.maxLife
                this.opacity = p < 0.15 ? p / 0.15 : Math.max(0, 1 - (p - 0.15) / 0.85)
                if (this.life > this.maxLife) { this.active = false; this.reset() }
            }
            draw() {
                if (!this.active) return
                ctx.save()
                ctx.globalAlpha = this.opacity
                const g = ctx.createLinearGradient(
                    this.x, this.y,
                    this.x - Math.cos(this.angle) * this.length,
                    this.y - Math.sin(this.angle) * this.length)
                g.addColorStop(0, 'rgba(255,255,255,0.95)')
                g.addColorStop(0.25, 'rgba(139,92,246,0.4)')
                g.addColorStop(1, 'rgba(255,60,131,0)')
                ctx.strokeStyle = g
                ctx.lineWidth = 1.2
                ctx.beginPath()
                ctx.moveTo(this.x, this.y)
                ctx.lineTo(
                    this.x - Math.cos(this.angle) * this.length,
                    this.y - Math.sin(this.angle) * this.length)
                ctx.stroke()

                // Head
                ctx.globalAlpha = this.opacity * 0.7
                ctx.fillStyle = '#fff'
                ctx.beginPath()
                ctx.arc(this.x, this.y, 2, 0, Math.PI * 2)
                ctx.fill()
                ctx.restore()
            }
        }

        const stars = Array.from({ length: 90 }, () => new Star())
        const shooters = [new ShootingStar(), new ShootingStar()]

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            stars.forEach(s => { s.update(); s.draw() })
            shooters.forEach(s => { s.update(); s.draw() })
            animId = requestAnimationFrame(animate)
        }
        animate()

        return () => {
            window.removeEventListener('resize', resize)
            window.removeEventListener('mousemove', onMouse)
            cancelAnimationFrame(animId)
        }
    }, [])

    return <canvas className="star-field" ref={canvasRef} />
}
