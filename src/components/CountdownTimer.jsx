import { useState, useEffect } from 'react'

const RELATIONSHIP_START = new Date('2024-12-20T00:00:00')

function calculateTimeTogether() {
    const now = new Date()
    const diff = now - RELATIONSHIP_START

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
}

// Sayı değişim animasyonu
function AnimatedNumber({ value }) {
    const [display, setDisplay] = useState(value)
    const [flip, setFlip] = useState(false)

    useEffect(() => {
        if (value !== display) {
            setFlip(true)
            const timer = setTimeout(() => {
                setDisplay(value)
                setFlip(false)
            }, 150)
            return () => clearTimeout(timer)
        }
    }, [value, display])

    return (
        <span className={`countdown-number ${flip ? 'flip' : ''}`}>
            {String(display).padStart(2, '0')}
        </span>
    )
}

export default function CountdownTimer() {
    const [time, setTime] = useState(calculateTimeTogether)

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(calculateTimeTogether())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <section className="countdown-section">
            <div className="countdown-card">
                <h2 className="countdown-title">Birlikte Geçirdiğimiz Zaman ⏳</h2>
                <div className="countdown-grid">
                    <div className="countdown-item">
                        <AnimatedNumber value={time.days} />
                        <span className="countdown-label">Gün</span>
                    </div>
                    <div className="countdown-item">
                        <AnimatedNumber value={time.hours} />
                        <span className="countdown-label">Saat</span>
                    </div>
                    <div className="countdown-item">
                        <AnimatedNumber value={time.minutes} />
                        <span className="countdown-label">Dakika</span>
                    </div>
                    <div className="countdown-item">
                        <AnimatedNumber value={time.seconds} />
                        <span className="countdown-label">Saniye</span>
                    </div>
                </div>
                <p className="countdown-message">
                    …ve her saniyesi bir öncekinden güzeldi 💕
                </p>
            </div>
        </section>
    )
}
