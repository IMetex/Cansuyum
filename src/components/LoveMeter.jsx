import { useState, useRef, useCallback, useEffect } from 'react'

const MESSAGES = [
    { at: 0, text: 'Kalbe bas ve öğren! 💗' },
    { at: 1, text: 'Biraz daha bas! 💗' },
    { at: 3, text: 'Sevgi artıyor... 💕' },
    { at: 5, text: 'Kalbim hızlanıyor! 💓' },
    { at: 8, text: 'Çok güzel gidiyorsun! 🥰' },
    { at: 10, text: 'Aşk her yere yayılıyor! 💖' },
    { at: 13, text: 'Neredeyse patlıyorum! 🤯💕' },
    { at: 15, text: 'Bu kadar sevgi olur mu! 😍' },
    { at: 18, text: 'Son bir kaç tıklama! 💘' },
    { at: 20, text: 'SONSUZ MUTLULUK! ∞ 💝🎉✨' },
]

const HEART_EMOJIS = ['💖', '💕', '💗', '❤️', '💓', '✨', '🌟']
const MAX_COUNT = 20

function ClickHeart({ x, y, id, onDone }) {
    const [emoji] = useState(() => HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)])
    const [size] = useState(() => `${18 + Math.random() * 16}px`)

    useEffect(() => {
        const timer = setTimeout(() => onDone(id), 1200)
        return () => clearTimeout(timer)
    }, [id, onDone])

    return (
        <span className="click-heart" style={{ left: `${x}px`, top: `${y}px`, fontSize: size }}>
            {emoji}
        </span>
    )
}

export default function LoveMeter() {
    const [count, setCount] = useState(0)
    const [clickHearts, setClickHearts] = useState([])
    const heartIdRef = useRef(0)

    const currentMessage = MESSAGES.filter((m) => m.at <= count).pop()
    const percent = (count / MAX_COUNT) * 100
    const isComplete = count >= MAX_COUNT

    const removeHeart = useCallback((id) => {
        setClickHearts((prev) => prev.filter((h) => h.id !== id))
    }, [])

    const burstHearts = () => {
        for (let i = 0; i < 35; i++) {
            setTimeout(() => {
                const hid = heartIdRef.current++
                const x = (15 + Math.random() * 70) / 100 * window.innerWidth
                const y = (25 + Math.random() * 50) / 100 * window.innerHeight
                setClickHearts((prev) => [...prev, { id: hid, x, y }])
                setTimeout(() => {
                    setClickHearts((prev) => prev.filter((h) => h.id !== hid))
                }, 1300)
            }, i * 70)
        }
    }

    const handleClick = (e) => {
        if (isComplete) return
        const newCount = count + 1
        setCount(newCount)

        const hid = heartIdRef.current++
        setClickHearts((prev) => [...prev, { id: hid, x: e.clientX, y: e.clientY }])

        if (navigator.vibrate) navigator.vibrate(30)

        if (newCount >= MAX_COUNT) {
            burstHearts()
        }
    }

    return (
        <section className="counter-section">
            <div className="counter-card">
                <h2 className="counter-title">Seni Ne Kadar Seviyorum?</h2>
                <div className="love-meter">
                    <div className="love-meter-fill" style={{ width: `${percent}%` }} />
                </div>
                <p className="love-meter-label">{currentMessage?.text}</p>
                <button className={`love-btn ${isComplete ? 'completed' : ''}`} onClick={handleClick}>
                    <span className="love-btn-heart">💖</span>
                </button>
                <div className="love-count">
                    {isComplete
                        ? '🎉 Seni Sonsuza Dek Seviyorum! 🎉'
                        : '💖'.repeat(Math.min(count, 10))}
                </div>
            </div>
            {clickHearts.map((h) => (
                <ClickHeart key={h.id} id={h.id} x={h.x} y={h.y} onDone={removeHeart} />
            ))}
        </section>
    )
}
