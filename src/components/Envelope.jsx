import { useState } from 'react'

function spawnFireworks() {
    const colors = ['#f472b6', '#db2777', '#a78bfa', '#c4b5fd', '#fbcfe8', '#fde68a', '#f9a8d4']

    // Multi-wave fireworks
    for (let wave = 0; wave < 3; wave++) {
        setTimeout(() => {
            const cx = window.innerWidth * (0.3 + Math.random() * 0.4)
            const cy = window.innerHeight * (0.2 + Math.random() * 0.3)
            for (let i = 0; i < 24; i++) {
                const el = document.createElement('div')
                el.className = 'firework-particle'
                const angle = (Math.PI * 2 * i) / 24
                const dist = 60 + Math.random() * 100
                const dx = Math.cos(angle) * dist
                const dy = Math.sin(angle) * dist
                el.style.cssText = `
                    left: ${cx}px; top: ${cy}px;
                    width: ${3 + Math.random() * 4}px;
                    height: ${3 + Math.random() * 4}px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    --fw-end: translate(${dx}px, ${dy}px);
                    box-shadow: 0 0 6px currentColor;
                `
                document.body.appendChild(el)
                setTimeout(() => el.remove(), 1600)
            }
        }, wave * 300)
    }

    // Confetti rain
    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div')
        el.className = 'confetti-piece'
        const size = 4 + Math.random() * 8
        el.style.cssText = `
            left: ${Math.random() * 100}vw; top: -10px;
            width: ${size}px; height: ${size * 1.5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            --confetti-duration: ${2.5 + Math.random() * 2}s;
            --confetti-rotation: ${360 + Math.random() * 720}deg;
            animation-delay: ${Math.random() * 1.2}s;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        `
        document.body.appendChild(el)
        setTimeout(() => el.remove(), 5000)
    }
}

export default function Envelope({ onOpen }) {
    const [opened, setOpened] = useState(false)

    const handleClick = () => {
        if (opened) return
        setOpened(true)
        if (navigator.vibrate) navigator.vibrate([50, 30, 50])
        spawnFireworks()
        setTimeout(() => onOpen(), 800)
    }

    return (
        <>
            <p className="hero-subtitle">Sana bir sürprizim var...</p>
            <div className={`envelope ${opened ? 'opened' : ''}`} onClick={handleClick}>
                <div className="envelope-flap" />
                <div className="envelope-body">
                    <span className="envelope-emoji">💌</span>
                    <span className="envelope-text">Dokun ve aç</span>
                </div>
            </div>
            <p className="hero-hint">✨ Zarfa dokunarak mektubu aç ✨</p>
        </>
    )
}
