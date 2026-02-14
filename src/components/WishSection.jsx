import { useState, useEffect } from 'react'

function spawnPetals() {
    const colors = [
        '#e11d48', '#f43f5e', '#fb7185', '#fda4af',
        '#be123c', '#9f1239', '#fecdd3', '#c2185b',
    ]

    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const el = document.createElement('div')
            el.className = 'falling-petal'
            const size = 10 + Math.random() * 18
            const color = colors[Math.floor(Math.random() * colors.length)]
            el.style.cssText = `
                left: ${Math.random() * 100}vw;
                width: ${size}px;
                height: ${size * 1.3}px;
                background: radial-gradient(ellipse at 30% 30%, ${color}, ${color}dd, ${color}88);
                --petal-duration: ${3 + Math.random() * 4}s;
                --petal-rotation: ${180 + Math.random() * 540}deg;
                --petal-sway: ${-60 + Math.random() * 120}px;
                opacity: ${0.7 + Math.random() * 0.3};
            `
            document.body.appendChild(el)
            setTimeout(() => el.remove(), 8000)
        }, i * 50)
    }
}

export default function WishSection() {
    const [triggered, setTriggered] = useState(false)
    const [cooldown, setCooldown] = useState(0)

    useEffect(() => {
        let timer
        if (cooldown > 0) {
            timer = setInterval(() => {
                setCooldown((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [cooldown])

    const handlePetals = () => {
        if (cooldown > 0) return

        spawnPetals()
        setTriggered(true)
        setCooldown(15) // 30 saniye bekleme süresi

        // Animasyon state'ini temizle (görsel efekt için)
        setTimeout(() => setTriggered(false), 4000)
    }

    return (
        <section className="wish-section">
            <div className="wish-card">

                {/* 3D Rotating Heart */}
                <div className="heart-3d-container">
                    <div className="heart-3d">
                        <svg viewBox="0 0 100 100">
                            <defs>
                                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#f472b6" />
                                    <stop offset="50%" stopColor="#db2777" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                            </defs>
                            <path
                                fill="url(#hg)"
                                d="M50 88 C25 65, 0 50, 0 30 A25 25 0 0 1 50 18 A25 25 0 0 1 100 30 C100 50, 75 65, 50 88Z"
                            />
                        </svg>
                    </div>
                </div>

                {/* Infinity Path */}
                <div className="infinity-heart">
                    <svg viewBox="0 0 200 60" className="infinity-svg">
                        <defs>
                            <linearGradient id="ig" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#f472b6" />
                                <stop offset="50%" stopColor="#db2777" />
                                <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M100,30 C100,10 130,0 150,10 C175,22 175,48 150,50 C130,52 100,40 100,30 C100,20 70,8 50,10 C25,12 25,48 50,50 C70,52 100,40 100,30Z"
                            fill="none"
                            stroke="url(#ig)"
                            strokeWidth="2.5"
                            className="infinity-path"
                        />
                    </svg>
                </div>

                {/* Final message */}
                <div className="wish-final">
                    <p className="wish-emoji">🌹</p>
                    <p className="wish-text">Seninle her an daha güzel...</p>
                    <span className="sparkle-text">Seni Çok Seviyorum Cansuyum ∞</span>
                    <p className="wish-date">14 Şubat 2026</p>
                </div>

                {/* Gül Yaprakları Butonu */}
                <button
                    className={`rose-btn ${triggered ? 'triggered' : ''}`}
                    onClick={handlePetals}
                    disabled={cooldown > 0}
                    style={{ opacity: cooldown > 0 ? 0.6 : 1, cursor: cooldown > 0 ? 'not-allowed' : 'pointer' }}
                >
                    {cooldown > 0
                        ? `Tekrar için bekle: ${cooldown}s ⏳`
                        : '🌹 Gül Yapraklarını Yağdır 🌹'}
                </button>

            </div>
        </section>
    )
}
