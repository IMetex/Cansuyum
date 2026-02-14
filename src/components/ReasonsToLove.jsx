import { useState, useEffect, useRef } from 'react'

const REASONS = [
    { emoji: '💦', text: 'Cansuyum olduğun için, bana hayat verdiğin için' },
    { emoji: '😊', text: 'Gülüşünle kalbimin ritmini değiştirdiğin için' },
    { emoji: '🤗', text: 'En zor anlarımda sığınacak limanım olduğun için' },
    { emoji: '🌟', text: 'Geleceğe dair tüm hayallerimin başrolü olduğun için' },
    { emoji: '🫧', text: 'Ruhumu arındıran en temiz duygu olduğun için' },
    { emoji: '🌎', text: 'Benim kocaman dünyam olduğun için' },
    { emoji: '🫶', text: 'Beni, ben olduğum için sevdiğin için' },
    { emoji: '🦋', text: 'Sana her baktığımda içimi kıpır kıpır ettiğin için' },
    { emoji: '🎵', text: 'Sesinle huzur bulduğum tek yer olduğun için' },
    { emoji: '❤️', text: 'Sadece sen, sen olduğun için...' },
]

export default function ReasonsToLove() {
    const [index, setIndex] = useState(0)
    const [key, setKey] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const timerRef = useRef(null)

    const goTo = (i) => {
        if (isTransitioning) return
        setIsTransitioning(true)
        setTimeout(() => {
            setIndex(i)
            setKey((k) => k + 1)
            setIsTransitioning(false)
        }, 200)
        resetTimer()
    }

    const resetTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current)
        timerRef.current = setInterval(() => {
            setIndex((prev) => (prev + 1) % REASONS.length)
            setKey((k) => k + 1)
        }, 4500)
    }

    useEffect(() => {
        resetTimer()
        return () => clearInterval(timerRef.current)
    }, [])

    const reason = REASONS[index]

    return (
        <section className="reasons-section">
            <div className="reasons-card">
                <h2 className="reasons-title">Seni Neden Seviyorum? 💝</h2>
                <div className="reason-counter">{index + 1} / {REASONS.length}</div>
                <div className="reason-display">
                    <div className={`reason-item ${isTransitioning ? 'fading' : ''}`} key={key}>
                        <span className="reason-emoji">{reason.emoji}</span>
                        <p className="reason-text">{reason.text}</p>
                    </div>
                </div>
                <div className="reason-dots">
                    {REASONS.map((_, i) => (
                        <button
                            key={i}
                            className={`reason-dot ${i === index ? 'active' : ''}`}
                            onClick={() => goTo(i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
